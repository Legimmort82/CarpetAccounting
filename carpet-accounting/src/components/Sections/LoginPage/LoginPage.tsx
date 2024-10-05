import Image from "next/image"
import Logo from "@/assets/loginPage/Logo.svg"
import LoginForm from "./LoginForm/LoginForm"



function LoginPage() {
  return (
    <>
      <section className="flex flex-col items-center justify-between bg-[#050a30] h-screen overflow-auto lg:flex-row">
        <div className="2xl:pr-14">
          <Image className="w-[200px] h-[200px] lg:w-[450px] lg:h-[450px] 2xl:w-[600px] 2xl:h-[600px]" src={Logo} alt="logo" />
        </div>

        <div className="flex flex-col justify-center w-full lg:w-[60%] h-[80%] lg:h-screen z-10 bg-white rounded-t-full lg:rounded-t-none lg:rounded-br-full lg:rounded-tr-full">
          <LoginForm />
        </div>
      </section>
    </>
  )
}

export default LoginPage