import Image from 'next/image'
import eye from "@/assets/loginPage/eye.svg"
import eyeClose from "@/assets/loginPage/eye-closed.svg"
import { useState } from 'react';

function LoginForm() {
  const [typeKind, setTypeKind] = useState("password")

  const handleType = () => {
    if (typeKind == "password") {
      setTypeKind("text")
    }
    else if (typeKind == "text") {
      setTypeKind("password")
    }
  }

  return (
    <>
      <section className='flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-bold">ورود</h1>

        <form className='w-[70%] lg:w-[50%] mt-10 flex flex-col items-center justify-center'>
          <label className='w-full'>
            <span className="text-gray-500 font-semibold">نام کاربری</span>
            <input
              type="text"
              name="username"
              className="w-full mt-2 pr-4 h-[45px] border-none outline-none focus:ring-[2px] focus:ring-black bg-[#B3C6D0] px-2 py-1 rounded-lg" />
          </label>

          <label className='relative w-full mt-5'>
            <span className="text-gray-500 font-semibold">رمز عبور</span>
            <input
              type={typeKind}
              name="username"
              className="w-full mt-2 pr-4 h-[45px] border-none outline-none focus:ring-[2px] focus:ring-black bg-[#B3C6D0] px-2 py-1 rounded-lg" />
            <Image className='absolute top-[42px] left-4 w-6 h-6 cursor-pointer' onClick={handleType} src={typeKind == "password" ? eye : eyeClose} alt='eye' />
          </label>

          <div className='w-full mt-2 flex justify-between items-center text-[12px]'>
            <span>رمز عبور خود را فراموش کرده اید؟</span>
            <span className='text-blue-600 cursor-pointer'>بازیابی رمز عبور</span>
          </div>

          <button className='w-full text-[20px] mt-12 h-[45px] bg-[#050A30] text-white rounded-lg'>ورود</button>
        </form>
      </section>
    </>
  )
}

export default LoginForm;