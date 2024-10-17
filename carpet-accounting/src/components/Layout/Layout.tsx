import Image from "next/image";
import DropDown from "@/components/UI/DropDowns/DropDown";
import DropDownList from "@/components/UI/DropDowns/DropDownList";
import logo from "@/assets/loginPage/Logo.svg";
import carpetLogo from "@/assets/sideBar/carpet.svg";
import carpetListLogo from "@/assets/sideBar/carpet-list.svg";
import addCarpetLogo from "@/assets/sideBar/add.svg";
import inComplete from "@/assets/sideBar/inComplete.svg";
import workersListLogo from "@/assets/sideBar/workers-list.svg";
import workerLogo from "@/assets/sideBar/worker.svg";
import salaryLogo from "@/assets/sideBar/salary.svg";
import exitLogo from "@/assets/sideBar/exit.svg";
import menu from "@/assets/sideBar/hamburger-menu.svg";
import closeLogo from "@/assets/sideBar/close.svg"
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  const [openCarpet, setOpenCarpet] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);


  const openCarpetListHandler = () => {
    setOpenCarpet(!openCarpet);
  };
  const openWorkersListHandler = () => {
    setOpenWorkers(!openWorkers);
  };
  const openSalaryListHandler = () => {
    setOpenSalary(!openSalary);
  };
  const openSidebarHandler = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <section className="flex h-screen overflow-y-auto fixed w-screen">
        <motion.div
					initial={{x: '100vw'}}
					animate={{x: openSidebar ? 0 : "100vw"}}
					transition={{ duration: 0.5, type:"spring" }}

          className={` flex flex-col items-center bg-[#050A30] pr-12 z-96 h-screen fixed top-0 right-[-48px] min-w-[300px] overflow-y-auto overflow-x-hidden ${
            openSidebar ? "block" : "hidden"
          } `}
        >

					<Image onClick={() => setOpenSidebar(!openSidebar)} className="absolute top-3 left-3 cursor-pointer" src={closeLogo} alt="closeLogo"/>

          <Link href={"/"}>
            <Image
              className="w-[220px] h-[220px] cursor-pointer"
              src={logo}
              alt="logo"
            />
          </Link>

          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-4">
              <DropDown
                className={`${openCarpet ? "rotate-180" : "rotate-0"}`}
                logo={carpetLogo}
                onClick={openCarpetListHandler}
              >
                قالی ها
              </DropDown>

              <motion.div
                className={"w-full flex flex-col items-center"}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openCarpet ? "auto" : 0,
                  opacity: openCarpet ? 1 : 0,
                }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <DropDownList href="/carpets/all" logo={carpetListLogo}>
                  لیست تمام قالی ها
                </DropDownList>

                <DropDownList href="/carpets/add" logo={addCarpetLogo}>
                  اضافه کردن قالی
                </DropDownList>
                <DropDownList href="/carpets/incomplete" logo={inComplete}>
                  لیست تکمیل نشده ها
                </DropDownList>
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-center mb-4">
              <DropDown
                className={`${openWorkers ? "rotate-180" : "rotate-0"}`}
                logo={workersListLogo}
                onClick={openWorkersListHandler}
              >
                کارکنان
              </DropDown>

              <motion.div
                className="w-full flex flex-col items-center"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openWorkers ? "auto" : 0,
                  opacity: openWorkers ? 1 : 0,
                }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <DropDownList href="/employees/all" logo={workerLogo}>
                  لیست تمام کارکنان
                </DropDownList>
                <DropDownList href="/employees/add" logo={addCarpetLogo}>
                  اضافه کردن افراد
                </DropDownList>
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-center mb-4">
              <DropDown
                className={`${openSalary ? "rotate-180" : "rotate-0"}`}
                logo={salaryLogo}
                onClick={openSalaryListHandler}
              >
                حقوق
              </DropDown>

              <motion.div
                className="w-full flex flex-col items-center"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openSalary ? "auto" : 0,
                  opacity: openSalary ? 1 : 0,
                }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <DropDownList href="/salary/add-help" logo={salaryLogo}>
                  ثبت مساعده
                </DropDownList>
                <DropDownList href="/" logo={salaryLogo}>
                  حقوق ماهانه
                </DropDownList>
                <DropDownList href="/" logo={salaryLogo}>
                  فاکتور
                </DropDownList>
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-center mb-4 cursor-pointer">
              <DropDownList
                href="/"
                logo={exitLogo}
                className={"font-bold z-20"}
              >
                خروج
              </DropDownList>
            </div>
          </div>
        </motion.div>

        <div className="relative flex-1">
          <Image onClick={() => setOpenSidebar(!openSidebar)} className={` ${openSidebar ? "hidden" : "block"} z-40 cursor-pointer absolute top-3 right-[10px] w-7 h-7 sm:w-9 sm:h-9`} src={menu} alt="menu" />
          {children}
        </div>
      </section>
    </>
  );
}

export default Layout;
