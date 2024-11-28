import React from 'react'

const Button = ({
    children,
    className="",
    type="button",
    ...props
}) => {
  return (
        <button className={`${className} px-3 py-2 w-full rounded-lg font-satoshi font-bold text-xl`} {...props}>
            {children}
        </button>
    
  )
}

export default Button
