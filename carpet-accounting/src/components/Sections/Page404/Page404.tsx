import Image from "next/image"
import notFoundImg from "@/assets/404-img.svg"
import Link from "next/link"
import { motion } from "framer-motion"

const Page404 = () => {
  return (
    <>
    <div className="bg-white flex justify-center items-center h-screen overflow-auto w-full">
      <motion.div
        className="w-[35%] flex flex-col items-center gap-y-1"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 2, type: "spring", stiffness: 150 }}
      >
        <div>
          <Image src={notFoundImg} alt="notFoundImg" className="" />
        </div>

        <div className="flex flex-col items-center gap-y-16">
          <p className="text-2xl font-bold">صفحه مورد نظر یافت نشد</p>
          <Link href={'/'} className="bg-[#050A30] text-white text-xl py-4 px-10 rounded-md shadow-lg duration-300 hover:shadow-slate-500">خانه</Link>
        </div>
      </motion.div>
    </div>
  </>
  )
}

export default Page404