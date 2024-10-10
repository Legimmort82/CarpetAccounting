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
import { useEffect, useState } from "react";
import React from "react";

const colorArray = [
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
const naghshehArray = [
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
const toolArray = [
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
const arzArray = [
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
const shoaaArray = [
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
      rectangle:false,
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
    if (isRectangle == true) {
      setIsRectangle(false);
      console.log(isRectangle);
      methods.setValue("rectangle", isRectangle);
    } else {
      setIsRectangle(true);
      methods.setValue("rectangle", isRectangle);
    }

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


  const arz = methods.watch("arz");
  const tool = methods.watch("tool");
  useEffect(() => {
    if (arz && tool) {
      const calculatedMetraj = Number(arz) * Number(tool);
      methods.setValue("metraj", calculatedMetraj); // Set the value of 'metraj'
    }
  }, [arz, tool, methods.setValue]);
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
                name="regtangle"
                // checked={isRectangle}
                label={"مستطیل"}
                onChange={handleRectangleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7">
            <SelectableInputField
              name="arz"
              data={arzArray}
              placeholder={!isRectangle ? "انتخاب عرض":"انتخاب شعاع"}
              getRealValue={(value: string) => {
                methods.setValue("arz", value);
              }}
              className={`z-40`}
            />
            <SelectableInputField
              name="tool"
              data={toolArray}
              placeholder={!isRectangle ? "انتخاب طول":"انتخاب شعاع"}
              getRealValue={(value: string) => {
                methods.setValue("tool", value);
              }}
              className={`z-30`}
            />
            <SimpleInputField name="metraj" label={"متراژ"} readOnly/>
            <SelectableInputField
              name="naghsheh"
              data={naghshehArray}
              placeholder={"انتخاب نقشه"}
              getValue={(value: string) => {
                methods.setValue("naghsheh", value);
              }}
              className={"z-20"}
            />
            <SelectableInputField
              name="rang"
              data={colorArray}
              placeholder="انتخاب رنگ"
              getValue={(value: string) => {
                methods.setValue("rang", value);
              }}
            />
            <SimpleInputField name="serial" label={"سریال"} />
            <SimpleInputField name="code" label={"کد"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#9fa8ff] py-7 ">
          <SelectableInputField
              name="shirazeh"
              data={colorArray}
              placeholder="انتخاب شیرازه"
              getRealValue={(value: string) => {
                methods.setValue("shirazeh", value);
              }}
            />
            <SimpleInputField name="shirazehVouroud" label={"تاریخ ورود"} />
            <SimpleInputField name="shirazehKhoroug" label={"تاریخ خروج"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#8b97ff] py-7 ">
          <SelectableInputField
              name="gereh"
              data={colorArray}
              placeholder="انتخاب گره"
              getRealValue={(value: string) => {
                methods.setValue("gereh", value);
              }}
            />
            <SimpleInputField name="gerehVouroud" label={"تاریخ ورود"} />
            <SimpleInputField name="gerehKhoroug" label={"تاریخ خروج"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
          <SelectableInputField
              name="cheleh"
              data={colorArray}
              placeholder="انتخاب چله"
              getRealValue={(value: string) => {
                methods.setValue("cheleh", value);
              }}
            />
            <SimpleInputField name="chelehVouroud" label={"تاریخ ورود"} />
            <SimpleInputField name="chelehKhoroug" label={"تاریخ خروج"} />
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
