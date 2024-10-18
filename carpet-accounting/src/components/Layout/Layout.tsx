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
import closeLogo from "@/assets/sideBar/close.svg";
import { LegacyRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useOutsideClick from "@/hooks/useOutsideClick";

type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  const [openCarpet, setOpenCarpet] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleClickOutside = () => {
    setOpenSidebar(false);
  };
  const SelectRef = useOutsideClick({ handler: handleClickOutside });

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
      <section className="flex">
          <motion.div
            ref={SelectRef as LegacyRef<HTMLDivElement> | undefined}
            initial={{ x: "100vw" }}
            animate={{ x: openSidebar ? 0 : "100vw" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={` flex flex-col items-center bg-[#050A30] pr-[60px] z-96 h-screen fixed top-0 right-[-60px] min-w-[300px] overflow-y-auto overflow-x-hidden  `}
          >
            <Image
              onClick={openSidebarHandler}
              className="absolute top-2 left-2 cursor-pointer w-8 h-8 hover:scale-110 duration-200"
              src={closeLogo}
              alt="closeLogo"
            />

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
                  className={"font-bold z-20 bg-white"}
                >
                  خروج
                </DropDownList>
              </div>
            </div>
          </motion.div>

        <div className="flex-1">
          <Image
            onClick={openSidebarHandler}
            className=" z-40 cursor-pointer fixed top-3 right-[15px] w-7 h-7 hover:scale-105 duration-200 sm:w-9 sm:h-9"
            src={menu}
            alt="menu"
          />
          {children}
        </div>
      </section>
    </>
  );
}

export default Layout;
