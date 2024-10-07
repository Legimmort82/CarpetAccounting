import Image from "next/image"

type props = {
	children: React.ReactNode
  logo: string
  className?: string
}

function DropDownList({ children, logo, className }: props) {
  return (
    <>
      <div className={`bg-gray-200 h-8 w-[85%] flex justify-items-start items-center px-2 py-5 rounded-md mb-2 cursor-pointer ${className}`}>
        <div className="ml-2">
          <Image className="w-[30px] h-[30px]" src={logo} alt="logo"/> 
        </div>

        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default DropDownList