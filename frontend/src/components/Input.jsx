import { useState, forwardRef, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      value,
      name,
      id,
      onChange,
      placeholder,
      autoComplete,
      wrapperClassName = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId()
    const inputId = id || name || generatedId;


    return (
      <div className={wrapperClassName}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className = "text-sm font-medium mb-2"
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative mt-2">
          <input
            id={inputId}
            name={name}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            pattern={type === "tel" ? "[0-9]*" : undefined} 
            value={value}
            autoComplete={autoComplete}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`input-uber ${isPassword ? "pr-12" : ""}`}
            {...props}
          />

          {/* Eye button (only for password) */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
