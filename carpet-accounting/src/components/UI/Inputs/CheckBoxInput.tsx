import { forwardRef } from "react"

type props = {
  type?: string;
  error?: string;
  name?: string;
  required?: boolean;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxInput = forwardRef(
  (
    {
      type = "checkbox",
      error,
      name,
      required,
      label,
      checked,
      onChange,
    }: props,
    ref: any
  ) => {
    return (
      <>
        <div>
          <label className="text-xl pl-2">{label}</label>
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


export default CheckBoxInput