import Image from "next/image"
import downArrow from "@/assets/sideBar/down-arrow.svg"
import DropDownList from "./DropDownList"

type props = {
  children: React.ReactNode,
  logo: string,
  onClick?: () => void
}

function DropDown({ children, logo, onClick }: props) {
  return (
    <>
      <div onClick={onClick} className='relative bg-white h-8 w-[85%] flex justify-items-start items-center px-2 py-5 rounded-md mb-2 cursor-pointer'>
        <div className="ml-2">
          <Image className="w-[35px] h-[35px]" src={logo} alt="logo" />
        </div>

        <div className="font-bold">
          {children}
        </div>

        <Image className="absolute left-3 top-[14]" src={downArrow} alt="downArrow" />
      </div>
    </>
  )
}

export default DropDown