import * as React from 'react'

function SvgEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.9 9.6C14 7.4 12 6.2 10 6.2c-2 0-4 1.2-5.9 3.4-.2.2-.2.5 0 .7 1.9 2.2 4 3.4 5.9 3.4 2 0 4-1.2 5.9-3.4.2-.1.2-.5 0-.7zM10 13c-1.7 0-3.5-1.1-5.2-3C6.5 8 8.3 7 10 7c1.7 0 3.5 1.1 5.2 3-1.7 2-3.5 3-5.2 3zm0-5.3c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm0 3.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SvgEye
