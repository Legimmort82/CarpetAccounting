import Layout from "@/components/Layout/Layout"
import SimpleInput from "@/components/UI/Inputs/simpleInput"


function CarpetInput() {
  return (
    <>
      <Layout>
        <section className="flex flex-col min-h-screen w-full py-6 px-4 items-center overflow-auto">
          <h1 className="text-3xl font-bold mb-10">ویرایش قالی</h1>
          <h2 className="text-2xl font-bold self-start mb-6">مشخصات قالی</h2>

          <form className="flex flex-col gap-y-1">
            <div className="flex flex-wrap justify-center gap-10 items-center bg-[#cbcfff] py-7 rounded-tr-md rounded-tl-md">
              <SimpleInput text={"عرض"} />
              <SimpleInput text={"طول"} />
              <SimpleInput text={"متراژ"} />
              <SimpleInput text={"نقشه"} />
              <SimpleInput text={"رنگ"} />
              <SimpleInput text={"سریال"} />
              <SimpleInput text={"کد"} />
            </div>

            <div className="flex flex-wrap justify-center gap-12 items-center bg-[#9fa8ff] py-7 ">
              <SimpleInput text={"شیرازه"} />
              <SimpleInput text={"تاریخ ورود"} />
              <SimpleInput text={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-12 items-center bg-[#8b97ff] py-7 ">
              <SimpleInput text={"گره"} />
              <SimpleInput text={"تاریخ ورود"} />
              <SimpleInput text={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-12 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
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
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">حذف</button>
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">ویرایش</button>
              </div>
            </div>
          </form>
        </section>
      </Layout>
    </>
  )
}

export default CarpetInput