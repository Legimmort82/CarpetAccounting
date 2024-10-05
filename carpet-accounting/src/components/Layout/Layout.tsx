import Image from "next/image"
import DropDown from "./DropDowns/DropDown"
import DropDownList from "./DropDowns/DropDown-list/DropDownList"
import logo from "@/assets/loginPage/Logo.svg"
import carpetLogo from "@/assets/sideBar/carpet.svg"
import carpetListLogo from "@/assets/sideBar/carpet-list.svg"
import carpetCalendarListLogo from "@/assets/sideBar/carpet-calendar-list.svg"
import addCarpetLogo from "@/assets/sideBar/add.svg"
import editCarpetLogo from "@/assets/sideBar/edit.svg"
import workersListLogo from "@/assets/sideBar/workers-list.svg"
import workerLogo from "@/assets/sideBar/worker.svg"
import trashWorkerLogo from "@/assets/sideBar/trash.svg"
import skillWorkersListLogo from "@/assets/sideBar/skill-worker-list.svg"
import salaryLogo from "@/assets/sideBar/salary.svg"
import exitLogo from "@/assets/sideBar/exit.svg"
import { useState } from "react"

type props = {
	children: React.ReactNode
}

function Layout({ children }: props) {
	const [openCarpet, setOpenCarpet] = useState(false)
	const [openWorkers, setOpenWorkers] = useState(false)
	const [openSalary, setOpenSalary] = useState(false)

	const openCarpetListHandler = () => {
		setOpenCarpet(!openCarpet);
	}
	const openWorkersListHandler = () => {
		setOpenWorkers(!openWorkers);
	}
	const openSalaryListHandler = () => {
		setOpenSalary(!openSalary);
	}

	return (
		<>
			<section className="flex">

				<div className="flex flex-col items-center bg-[#050A30] z-10 h-screen sticky top-0 right-0 min-w-[350px] overflow-auto">
					<div>
						<Image className="w-[220px] h-[220px]" src={logo} alt="logo" />
					</div>

					<div className="w-full flex flex-col items-center">
						<div className="w-full flex flex-col items-center mb-4">
							<DropDown
								logo={carpetLogo}
								onClick={openCarpetListHandler}
							>
								قالی ها
							</DropDown>

							<DropDownList
								logo={carpetListLogo}
								className={openCarpet ? "block" : "hidden"}
							>
								لیست تمام قالی ها
							</DropDownList>
							<DropDownList
								logo={carpetCalendarListLogo}
								className={openCarpet ? "block" : "hidden"}
							>
								لیست تمام قالی ها بر اساس ماه
							</DropDownList>
							<DropDownList
								logo={addCarpetLogo}
								className={openCarpet ? "block" : "hidden"}
							>
								اضافه کردن قالی
							</DropDownList>
							<DropDownList
								logo={editCarpetLogo}
								className={openCarpet ? "block" : "hidden"}
							>
								ویرایش قالی
							</DropDownList>
						</div>

						<div className="w-full flex flex-col items-center mb-4">
							<DropDown
								logo={workersListLogo}
								onClick={openWorkersListHandler}
							>
								کارکنان
							</DropDown>

							<DropDownList
								logo={workerLogo}
								className={openWorkers ? "block" : "hidden"}
							>
								لیست تمام کارکنان
							</DropDownList>
							<DropDownList
								logo={skillWorkersListLogo}
								className={openWorkers ? "block" : "hidden"}
							>
								لیست کارکنان بر اساس مهارت
							</DropDownList>
							<DropDownList
								logo={addCarpetLogo}
								className={openWorkers ? "block" : "hidden"}
							>
								اضافه کردن افراد
							</DropDownList>
							<DropDownList
								logo={editCarpetLogo}
								className={openWorkers ? "block" : "hidden"}
							>
								ویرایش افراد
							</DropDownList>
							<DropDownList
								logo={trashWorkerLogo}
								className={openWorkers ? "block" : "hidden"}
							>
								حذف افراد
							</DropDownList>
						</div>

						<div className="w-full flex flex-col items-center mb-4">
							<DropDown
								logo={salaryLogo}
								onClick={openSalaryListHandler}
							>
								حقوق
							</DropDown>

							<DropDownList
								logo={salaryLogo}
								className={openSalary ? "block" : "hidden"}
							>
								ثبت مساعده
							</DropDownList>
							<DropDownList
								logo={salaryLogo}
								className={openSalary ? "block" : "hidden"}
							>
								حقوق ماهانه
							</DropDownList>
							<DropDownList
								logo={salaryLogo}
								className={openSalary ? "block" : "hidden"}
							>
								فاکتور
							</DropDownList>
						</div>

						<div className="w-full flex flex-col items-center mb-4 cursor-pointer">
							<DropDownList
								logo={exitLogo}
								className={"font-bold"}
							>
								خروج
							</DropDownList>
						</div>
					</div>
				</div>

				<div className="flex-1">
					{children}
				</div>
			</section>
		</>
	)
}

export default Layout