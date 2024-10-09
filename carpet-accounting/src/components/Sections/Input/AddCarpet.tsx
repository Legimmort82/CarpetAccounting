import Layout from "@/components/Layout/Layout";
import Form from "@/components/UI/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCarpetSchema } from "@/schemas/AddCarpetSchema";
import {
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import useGetAllColors from "@/api/getColors";
import { log } from "util";
import { useQuery } from "@tanstack/react-query";

function AddCarpet() {
  const colors = useGetAllColors();
  // const {data} = useQuery({["Colors"], () => axios.get("127.0.0.1:8000/carpets/colors")})
  // console.log(data);
  // console.log(colors.data)
  const data = fetch("https://jsonplaceholder.typicode.com/todos/").then((res) => {
    res.json();
    console.log(res);
    
  });
  const arrey = [
    { value: "نارنجی", id: 1 },
    { value: "سفید", id: 2 },
    { value: "زرد", id: 3 },
    { value: "آبی", id: 4 },
    { value: "قرمز", id: 5 },
    { value: "زرشکی", id: 6 },
    { value: "سبز", id: 7 },
    { value: "قهوه ای", id: 8 },
    { value: "طوسی", id: 9 },
    { value: "سرمه ای", id: 10 },
  ];
  const methods = useForm({
    defaultValues: {
      arz: "",
      tool: "",
      metraj: "",
      naghsheh: "",
      rang: "",
      serial: "",
      code: "",
      shirazeh: "",
      shirazehKhoroug: "",
      shirazehVouroud: "",
      cheleh: "",
      chelehKhroug: "",
      chelehVouroud: "",
      gereh: "",
      gerehKhoroug: "",
      gerehVouroud: "",
    },
    // resolver: zodResolver(AddCarpetSchema),
  });
  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <Layout>
      <section className="flex flex-col min-h-screen w-full py-6 px-4 items-center overflow-auto">
        <h1 className="text-3xl font-bold mb-14">اضافه کردن قالی</h1>

        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="flex flex-col gap-y-1"
        >
          <div className="flex items-center justify-center gap-6 self-start w-full py-7 px-6 bg-[#dfe1ff] rounded-tr-md rounded-tl-md">
            <h2 className="text-xl font-bold self-start pl-5">نوع قالی:</h2>

            <div>
              <label className="text-xl pl-2">مستطیل</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div>
              <label className="text-xl pl-2">گرد</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7">
            <SimpleInputField name="arz" text={"عرض"} />
            <SimpleInputField name="tool" text={"طول"} />
            <SimpleInputField name="metraj" text={"متراژ"} />
            <SimpleInputField name="naghsheh" text={"نقشه"} />
            <SelectableInputField
              name="rang"
              data={arrey}
              placeholder="انتخاب رنگ"
              getValue={(value: string) => {
                methods.setValue("rang", value);
              }}
            />
            <SimpleInputField name="serial" text={"سریال"} />
            <SimpleInputField name="code" text={"کد"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#9fa8ff] py-7 ">
            <SimpleInputField name="shirazeh" text={"شیرازه"} />
            <SimpleInputField name="shirazehVouroud" text={"تاریخ ورود"} />
            <SimpleInputField name="shirazehKhoroug" text={"تاریخ خروج"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#8b97ff] py-7 ">
            <SimpleInputField name="gereh" text={"گره"} />
            <SimpleInputField name="gerehVouroud" text={"تاریخ ورود"} />
            <SimpleInputField name="gerehKhoroug" text={"تاریخ خروج"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
            <SimpleInputField name="cheleh" text={"چله"} />
            <SimpleInputField name="chelehVouroud" text={"تاریخ ورود"} />
            <SimpleInputField name="chelehKhoroug" text={"تاریخ خروج"} />
          </div>

          <div className="flex justify-between items-center mt-7">
            <div className="flex items-center justify-center gap-2">
              <label className="text-xl">ارسال شده</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex justify-center items-center gap-2">
              <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">
                انصراف
              </button>
              <button
                type="submit"
                className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600"
              >
                اضافه کردن
              </button>
            </div>
          </div>
        </Form>
      </section>
    </Layout>
  );
}

export default AddCarpet;
