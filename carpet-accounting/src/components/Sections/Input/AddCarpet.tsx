import Layout from "@/components/Layout/Layout";
import Form from "@/components/UI/Form";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCarpetSchema } from "@/schemas/AddCarpetSchema";
import {
  CheckBoxInputField,
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import useGetAllColors from "@/api/getColors";
import { log } from "util";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import React from "react";

const colorArrey = [
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

const naghshehArrey = [
  { value: "سلطانی", id: 1 },
  { value: "آهو", id: 2 },
  { value: "پلنگی", id: 3 },
  { value: "دریا", id: 4 },
  { value: "جنگل", id: 5 },
  { value: "کوه", id: 6 },
  { value: "بیابان", id: 7 },
  { value: "رود", id: 8 },
  { value: "ساحل", id: 9 },
  { value: "جزیره", id: 10 },
];

const toolArrey = [
  { value: "4", id: 1 },
  { value: "2", id: 2 },
  { value: "5", id: 3 },
  { value: "2", id: 4 },
  { value: "6", id: 5 },
  { value: "3", id: 6 },
  { value: "3", id: 7 },
  { value: "4", id: 8 },
  { value: "2", id: 9 },
  { value: "4", id: 10 },
];

const arzArrey = [
  { value: "3", id: 1 },
  { value: "2", id: 2 },
  { value: "1", id: 3 },
  { value: "1", id: 4 },
  { value: "2", id: 5 },
  { value: "3", id: 6 },
  { value: "3", id: 7 },
  { value: "1", id: 8 },
  { value: "2", id: 9 },
  { value: "1", id: 10 },
];

const shoaaArrey = [
  { value: "3.5", id: 1 },
  { value: "2.25", id: 2 },
  { value: "1.9", id: 3 },
  { value: "1", id: 4 },
  { value: "2", id: 5 },
  { value: "3.25", id: 6 },
  { value: "3", id: 7 },
  { value: "1.75", id: 8 },
  { value: "2.45", id: 9 },
  { value: "1.25", id: 10 },
];

function AddCarpet() {
  const [isCircle, setIsCircle] = useState(false);
  const [isRectangle, setIsRectangle] = useState(true);
  const [isRadius, setIsRadius] = useState(false);
  const [isWH, setIsWH] = useState(true);

  const handleCircleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCircle(e.target.checked);
    if (e.target.checked) {
      setIsRectangle(false);
      setIsRadius(!isRadius);
      setIsWH(!isWH);
    }
  }
  const handleRectangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRectangle(e.target.checked);
    if (e.target.checked) {
      setIsCircle(false);
      setIsWH(!isWH);
      setIsRadius(!isRadius);
    }
  }


  // const colors = useGetAllColors();
  // // const {data} = useQuery({["Colors"], () => axios.get("127.0.0.1:8000/carpets/colors")})
  // // console.log(data);
  // // console.log(colors.data)
  // const data = fetch("https://jsonplaceholder.typicode.com/todos/").then((res) => {
  //   res.json();
  //   console.log(res);

  // });

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

            <div className="flex flex-wrap gap-5 items-center">
              <CheckBoxInputField
                name="circle"
                checked={isCircle}
                label={"دایره"}
                onChange={handleCircleChange}
              />
              <CheckBoxInputField
                name="regtangle"
                checked={isRectangle}
                label={"مستطیل"}
                onChange={handleRectangleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7">
            <SelectableInputField
              name="shoaa"
              data={shoaaArrey}
              placeholder={"انتخاب شعاع"}
              getValue={(value: string) => {
                methods.setValue("arz", value);
              }}
              className={`z-40 ${isCircle ? "" : "hidden"}`}
            />
            <SelectableInputField
              name="arz"
              data={arzArrey}
              placeholder={"انتخاب عرض"}
              getValue={(value: string) => {
                methods.setValue("arz", value);
              }}
              className={`z-40 ${isRectangle ? "" : "hidden"}`}
            />
            <SelectableInputField
              name="tool"
              data={toolArrey}
              placeholder={"انتخاب طول"}
              getValue={(value: string) => {
                methods.setValue("tool", value);
              }}
              className={`z-30 ${isRectangle ? "" : "hidden"}`}
            />
            <SimpleInputField name="metraj" text={"متراژ"} />
            <SelectableInputField
              name="naghsheh"
              data={naghshehArrey}
              placeholder={"انتخاب نقشه"}
              getValue={(value: string) => {
                methods.setValue("naghsheh", value);
              }}
              className={"z-20"}
            />
            <SelectableInputField
              name="rang"
              data={colorArrey}
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
            <CheckBoxInputField
              name="send"
              label={"ارسال شده"}
            />
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
