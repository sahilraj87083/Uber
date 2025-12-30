import { forwardRef , useId} from "react";

const Select = forwardRef(
  (
    {
      label,
      value,
      onChange,
      options = [],
      name,
      id,
      placeholder = "Select an option",
      required = false,
    },
    ref
  ) => {

    const generatedId = useId()
    const inputId = id || name || generatedId;

    return (
      <div >
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className = "text-sm font-medium mb-2"
          >
            {label}
          </label>
        )}

        <select
          id={inputId}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-uber mt-2 ${value === "" ? "text-sm text-gray-400" : "text-base text-black"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
