import Image from "next/image"
import notFoundImg from "@/assets/404-img.svg"
import Link from "next/link"
import { motion } from "framer-motion"


function PageNotFound() {
  return (
    <>
      <div className="bg-white flex justify-center items-center h-screen overflow-auto w-full">
        {/* <motion.div
          className="bg-[#050A30] z-10 w-[30%] h-screen rounded-l-[90%]"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        /> */}

        <motion.div
          className="w-[35%] flex flex-col items-center gap-y-1"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: "spring", stiffness: 150}}
        >
          <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1.5 }}
          >
            <Image src={notFoundImg} alt="notFoundImg" className="" />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-y-16"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1.5 }}
          >
            <p className="text-2xl font-bold">صفحه مورد نظر یافت نشد</p>
            <Link href={'/'} className="bg-[#050A30] text-white text-xl py-4 px-10 rounded-md shadow-lg duration-300 hover:shadow-slate-500">خانه</Link>
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="bg-[#050A30] z-10 w-[30%] h-screen rounded-r-[90%]"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        /> */}
      </div>
    </>
  )
}

export default PageNotFound