import { LegacyRef, forwardRef } from "react"

type props = {
  type?: string;
  error?: string;
  name?: string;
  required?: boolean;
  label?: string;
  checked?: boolean;
  className?:string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxInput = forwardRef(
  (
    {
      type = "checkbox",
      name,
      required,
      label,
      checked,
      onChange,
      className,
    }: props,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <>
        <div className="flex items-center">
          <label className={`text-xl pl-2 ${className}`}>{label}</label>
          <input
            type={type}
            checked={checked}
            ref={ref}
            name={name}
            required={required}
            onChange={onChange}
            className="w-5 h-5"
          />
        </div>
      </>
    )
  })
CheckBoxInput.displayName="Checkbox"

export default CheckBoxInput