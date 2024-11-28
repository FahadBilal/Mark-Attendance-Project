import React, { useId } from 'react'

const Select = ({
    label,
    options,
    className,
    ...props
},ref) => {
    const id = useId();
  return (
    <div className='w-full mb-4'>
         {label && (
        <label
          className="inline-block mb-1 pl-1 text-[16px] font-poppins font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select 
        id={id}
        ref={ref}
        className={`${className} w-full px-3 py-2 font-poppins rounded-lg  border focus:outline-none `}
      {...props}
      >
        {options.map((option)=>(
            <option key={option} value={option.toLowerCase()}>
                {option}
            </option>
        ))}

      </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
