import Layout from "@/components/Layout/Layout"
import SimpleInput from "@/components/UI/Inputs/SimpleInput"


function AddCarpet() {
  return (
    <>
      <Layout>
        <section className="flex flex-col min-h-screen w-full py-6 px-4 items-center overflow-auto">
          <h1 className="text-3xl font-bold mb-14">اضافه کردن قالی</h1>

          <form className="flex flex-col gap-y-1">
            <div className="flex items-center justify-center gap-6 self-start w-full py-7 px-6 bg-[#dfe1ff] rounded-tr-md rounded-tl-md">
              <h2 className="text-xl font-bold self-start pl-5">نوع قالی:</h2>

              <div>
                <label className="text-xl pl-2">مستطیل</label>
                <input className="w-5 h-5" type="checkbox" />
              </div>
              <div>
                <label className="text-xl pl-2">گرد</label>
                <input className="w-5 h-5" type="checkbox"/>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7">
              <SimpleInput text={"عرض"} />
              <SimpleInput text={"طول"} />
              <SimpleInput text={"متراژ"} />
              <SimpleInput text={"نقشه"} />
              <SimpleInput text={"رنگ"} />
              <SimpleInput text={"سریال"} />
              <SimpleInput text={"کد"} />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center bg-[#9fa8ff] py-7 ">
              <SimpleInput text={"شیرازه"} />
              <SimpleInput text={"تاریخ ورود"} />
              <SimpleInput text={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center bg-[#8b97ff] py-7 ">
              <SimpleInput text={"گره"} />
              <SimpleInput text={"تاریخ ورود"} />
              <SimpleInput text={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
              <SimpleInput text={"چله"} />
              <SimpleInput text={"تاریخ ورود"} />
              <SimpleInput text={"تاریخ خروج"} />
            </div>

            <div className="flex justify-between items-center mt-7">
              <div className="flex items-center justify-center gap-2">
                <label className="text-xl">ارسال شده</label>
                <input className="w-5 h-5" type="checkbox" />
              </div>
              <div className="flex justify-center items-center gap-2">
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">انصراف</button>
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">اضافه کردن</button>
              </div>
            </div>
          </form>
        </section>
      </Layout>
    </>
  )
}

export default AddCarpet