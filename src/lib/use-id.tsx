import { createContext, useContext, useRef } from 'react'

const Id = createContext<{ getter?: () => string }>({})

const buildGetter = (prefix = 'id') => {
  let id = 0
  // eslint-disable-next-line no-plusplus
  return () => `${prefix}-${id++}`
}

export const useId = (): string => {
  const globalRef = useContext(Id)
  const ref = useRef<string>()
  const getter = globalRef.getter || buildGetter()
  globalRef.getter = getter
  if (!ref.current) ref.current = getter()
  return ref.current
}
