import React, { type InputHTMLAttributes, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  { label = false, name, error, className, ...props },
  ref
) => {
  const inputBaseClass = "w-full px-2 py-3 text-base focus:outline-none focus:ring-0 bg-white text-black border-gray-600 rounded-lg";
  const inputErrorClass = error ? "border-red-500" : "border-gray-300";

  return (
    <div className={`${className ?? ""}`}>
      {label && (
        <label htmlFor={name} className="block mb-2 font-semibold text-gray-300">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        ref={ref}
        className={`${inputBaseClass} ${inputErrorClass}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </span>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;