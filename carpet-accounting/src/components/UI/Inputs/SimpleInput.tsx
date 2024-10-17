import { LegacyRef, forwardRef, useState } from "react";

type props = {
  type?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  label?: string;
  readOnly?: boolean;
  className?:string;
  onChange?: () => void;
};

const SimpleInput = forwardRef(
  (
    {
      type = "text",
      value,
      error,
      placeholder,
      name,
      readOnly,
      required,
      label,
      className,
      onChange,
    }: props,
    ref : LegacyRef<HTMLInputElement>
  ) => {
    const [focus, setFocus] = useState(false);
    const handleFocus = () => {
      setFocus(true);
    };
    const handleBlur = () => {
      setFocus(false);
    };
    return (
      <div className="flex items-center justify-center gap-2">
        <label className={`text-lg font-bold ${className}`}>{label}</label>
        <input
          readOnly={readOnly}
          type={type}
          required={required}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full py-2 px-4 bg-gray-50 outline-none focus:ring-1 focus:ring-black duration-200 rounded-md ${
            focus ? "scale-[1.03]" : ""
          } ${error ? "bg-red-200" : ""}`}
        />
        {/* {error && <p className="text-sm text-red-600 mt-2">{error}</p>} */}
      </div>
    );
  }
);
SimpleInput.displayName= "Simple"

export default SimpleInput;
