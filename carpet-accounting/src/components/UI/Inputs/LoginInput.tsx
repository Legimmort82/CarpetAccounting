
import { forwardRef, useState } from "react";
import Image from "next/image";
import eye from "@/assets/loginPage/eye.svg"
import eyeClose from "@/assets/loginPage/eye-closed.svg"

type props = {
  type?: string,
  value?: string,
  error?: string,
  placeholder?: string,
  name?: string,
  required: boolean,
  onChange?: () => void,
  text: string,
  isEye?: boolean
}

const LoginInput = forwardRef(
  (
    {
      type,
      value,
      error,
      placeholder,
      name,
      required,
      onChange,
      text,
      isEye = false
    }: props,
    ref: any
  ) => {

    const [typeKind, setTypeKind] = useState(type)
    const handleType = () => {
      if (typeKind == "password") {
        setTypeKind("text")
      }
      else if (typeKind == "text") {
        setTypeKind("password")
      }
    }

    return (
      <div className="relative w-full">
        {isEye && <Image src={typeKind == "text" ? eye : eyeClose} alt="eyeLogo" onClick={handleType} className="absolute top-6 left-4 w-6 h-6 cursor-pointer" />}
        <label className="text-gray-500 font-semibold">{text}</label>
        <input
          type={typeKind}
          required={required}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          className="w-full mt-2 pr-4 h-[45px] border-none outline-none focus:ring-[2px] focus:ring-black bg-[#B3C6D0] px-2 py-1 rounded-lg"
        />
        {error && <p className="mt-[5px] text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default LoginInput;