import Image from "next/image"
import Link from "next/link"

type props = {
  children: React.ReactNode
  logo: string
  className?: string
  href: string
}

function DropDownList({ children, logo, href, className }: props) {
  return (
    <Link className={`bg-gray-200 h-8 w-[85%] flex justify-items-start items-center px-2 py-5 rounded-md mb-2 cursor-pointer ${className}`} href={href}>
      <div className="ml-2">
        <Image className="w-[30px] h-[30px]" src={logo} alt="logo" />
      </div>

      <div>
        {children}
      </div>
    </Link>
  )
}

export default DropDownList