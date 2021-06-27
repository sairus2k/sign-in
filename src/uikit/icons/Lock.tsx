import * as React from 'react'

function SvgLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M14.1 9.2h-.6V7.6c0-2-1.6-3.6-3.6-3.6S6.3 5.6 6.3 7.6v1.7h-.4c-.6 0-1.1.5-1.1 1.1v4.5c0 .6.5 1.1 1.1 1.1h8.2c.6 0 1.1-.5 1.1-1.1v-4.5c.1-.6-.5-1.2-1.1-1.2zm-3.2 4c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1.1c0-.5.4-.9.9-.9s.9.4.9.9v1.1zm.8-4H8.3V7.6c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v1.6z"
      />
    </svg>
  )
}

export default SvgLock
