import React, { forwardRef, useId } from "react";

const Input = (
  {
    label,
    type = "text",
    className = "",
    value= "",
    placeholder = "",
    ...props
  },
  ref
) => {
  const id = useId;
  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-[16px] font-poppins font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${className} w-full px-3 py-2 font-poppins rounded-lg   border focus:outline-none focus:ring-2 focus:ring-gray-400  `}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
