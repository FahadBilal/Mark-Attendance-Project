import React from "react";
import { useId } from "react";

function Textarea(
  {
    label,
    placeholder ="",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();
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
      <textarea
        placeholder={placeholder}
        className={`${className} w-full px-3 py-2 font-poppins rounded-lg   border focus:outline-none  focus:bg-[#eafff9]  `}
        ref={ref}
        id={id}
        {...props}
        rows={5}
      ></textarea>
    </div>
  );
}

export default React.forwardRef(Textarea);
