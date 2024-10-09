import Image from "next/image"
import DropDown from "@/components/UI/DropDowns/DropDown"
import DropDownList from "@/components/UI/DropDowns/DropDownList"
import logo from "@/assets/loginPage/Logo.svg"
import carpetLogo from "@/assets/sideBar/carpet.svg"
import carpetListLogo from "@/assets/sideBar/carpet-list.svg"
import addCarpetLogo from "@/assets/sideBar/add.svg"
import workersListLogo from "@/assets/sideBar/workers-list.svg"
import workerLogo from "@/assets/sideBar/worker.svg"
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
			<section className="flex h-screen overflow-y-auto fixed">
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

							<div className={`${openCarpet ? "block" : "hidden"} w-full flex flex-col items-center`}>
								<DropDownList
									href="/carpets/all"
									logo={carpetListLogo}
								>
									لیست تمام قالی ها
								</DropDownList>

								<DropDownList
									href="/carpets/add"
									logo={addCarpetLogo}
								>
									اضافه کردن قالی
								</DropDownList>
							</div>
						</div>

						<div className="w-full flex flex-col items-center mb-4">
							<DropDown
								logo={workersListLogo}
								onClick={openWorkersListHandler}
							>
								کارکنان
							</DropDown>

							<div className={`${openWorkers ? "block" : "hidden"} w-full flex flex-col items-center`}>
								<DropDownList
									href="/employees/all"
									logo={workerLogo}
								>
									لیست تمام کارکنان
								</DropDownList>
								<DropDownList
									href="/employees/add"
									logo={addCarpetLogo}
								>
									اضافه کردن افراد
								</DropDownList>
							</div>
						</div>

						<div className="w-full flex flex-col items-center mb-4">
							<DropDown
								logo={salaryLogo}
								onClick={openSalaryListHandler}
							>
								حقوق
							</DropDown>

							<div className={`${openSalary ? "block" : "hidden"} w-full flex flex-col items-center`}>
								<DropDownList
									href="/"
									logo={salaryLogo}
								>
									ثبت مساعده
								</DropDownList>
								<DropDownList
									href="/"
									logo={salaryLogo}
								>
									حقوق ماهانه
								</DropDownList>
								<DropDownList
									href="/"
									logo={salaryLogo}
								>
									فاکتور
								</DropDownList>
							</div>

						</div>

						<div className="w-full flex flex-col items-center mb-4 cursor-pointer">
							<DropDownList
								href="/"
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