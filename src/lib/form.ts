type Message = string
type ValidateResult = Message | undefined

type Validate = (
  value: unknown,
  allValues: Record<string, unknown>,
) => ValidateResult

type ValidationRuleNumber = {
  value: number
  message: Message
}

type ValidationRulePattern = {
  value: RegExp
  message: Message
}

type ValidationRules = Partial<{
  required: Message
  min: ValidationRuleNumber
  max: ValidationRuleNumber
  maxLength: ValidationRuleNumber
  minLength: ValidationRuleNumber
  pattern: ValidationRulePattern
  validate: Validate
}>

export type Validation<FormState extends Record<string, unknown>> = Partial<
  Record<keyof FormState, ValidationRules>
>

const validators = {
  required:
    (message: Message) =>
    (data: unknown): ValidateResult =>
      data ? undefined : message,
  min:
    ({ value, message }: ValidationRuleNumber) =>
    (data: unknown): ValidateResult =>
      typeof data === 'number' && (Number.isNaN(data) || data >= value)
        ? undefined
        : message,
  max:
    ({ value, message }: ValidationRuleNumber) =>
    (data: unknown): ValidateResult =>
      typeof data === 'number' && (Number.isNaN(data) || data <= value)
        ? undefined
        : message,
  maxLength:
    ({ value, message }: ValidationRuleNumber) =>
    (data: unknown): ValidateResult =>
      typeof data === 'string' && data.length <= value ? undefined : message,
  minLength:
    ({ value, message }: ValidationRuleNumber) =>
    (data: unknown): ValidateResult =>
      typeof data === 'string' && data.length >= value ? undefined : message,
  pattern:
    ({ value, message }: ValidationRulePattern) =>
    (data: unknown): ValidateResult =>
      typeof data === 'string' && value.test(data) ? undefined : message,
  validate:
    (cb: Validate) =>
    (data: unknown, allValues: Record<string, unknown>): ValidateResult =>
      cb(data, allValues),
} as const

type ValidationFn = (
  data: unknown,
  allValues: Record<string, unknown>,
) => ValidateResult

const composeValidators =
  (...validations: ValidationFn[]) =>
  (data: unknown, allValues: Record<string, unknown>): ValidateResult =>
    validations.reduce(
      (error: ValidateResult, validator: ValidationFn) =>
        error || validator(data, allValues),
      undefined,
    )

const validator = (rules: ValidationRules) =>
  composeValidators(
    ...Object.entries(rules).map(([name, rule]) =>
      validators[name as keyof ValidationRules](rule as any),
    ),
  )

const isInputName = <FormState extends Record<string, unknown>>(
  name: unknown,
  defaultValues: FormState,
): name is keyof FormState =>
  typeof name === 'string' && Object.keys(defaultValues).includes(name)

const validateValue = (
  validatorsArr: ValidationRules,
  value: unknown,
  allValues: Record<string, unknown>,
): ValidateResult => {
  return validator(validatorsArr)(value, allValues)
}

const getElementValue = (element: HTMLInputElement): string | boolean =>
  element.type === 'checkbox' ? element.checked : element.value

export const getValues = <FormState extends Record<string, unknown>>(
  form: HTMLFormElement,
  defaultValues: FormState,
): FormState => {
  const values: Record<string, unknown> = { ...defaultValues }

  Object.values(form.elements).forEach((element) => {
    if (
      element instanceof HTMLInputElement &&
      isInputName(element.name, defaultValues)
    ) {
      values[element.name] = getElementValue(element)
    }
  })

  return values as FormState
}

export const validate = <FormState extends Record<string, unknown>>(
  form: HTMLFormElement,
  validation: Validation<FormState>,
  defaultValues: FormState,
): undefined | Record<keyof FormState, string> => {
  const errors: Record<string, unknown> = {}
  let hasErrors = false

  const formValues = getValues(form, defaultValues)

  Object.values(form.elements).forEach((element) => {
    if (
      element instanceof HTMLInputElement &&
      isInputName(element.name, defaultValues)
    ) {
      const validationElement = validation[element.name]

      if (validationElement === undefined) {
        return
      }

      const error = validateValue(
        validationElement,
        getElementValue(element),
        formValues,
      )

      if (error !== undefined) {
        errors[element.name] = error
        hasErrors = true
      }
    }
  })

  return hasErrors ? (errors as Record<keyof FormState, string>) : undefined
}
