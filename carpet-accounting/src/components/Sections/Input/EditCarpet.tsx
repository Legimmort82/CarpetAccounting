import Layout from "@/components/Layout/Layout";
import {
  CheckBoxInputField,
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import React from "react";
import useGetAllColors from "@/api/Carpets/Colors&Designs/getColors";
import useGetDesigns from "@/api/Carpets/Colors&Designs/getDesigns";
import useGetCircleSizes from "@/api/Carpets/Sizes/getCircleSizes";
import useGetRectangleLength from "@/api/Carpets/Sizes/getRectangleLength";
import useGetRectangleWidth from "@/api/Carpets/Sizes/getRectangleWidth";
import useGetCheleh from "@/api/Carpets/Skills/getCheleh";
import useGetGereh from "@/api/Carpets/Skills/getGereh";
import useGetShirazeh from "@/api/Carpets/Skills/getShirazeh";

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

function EditCarpet() {
  const { data: colors } = useGetAllColors();
  const { data: designs } = useGetDesigns();
  const { data: CircleSizes } = useGetCircleSizes();
  const { data: Widths } = useGetRectangleWidth();
  const { data: Lengths } = useGetRectangleLength();
  const { data: Cheleh } = useGetCheleh();
  const { data: Gereh } = useGetGereh();
  const { data: Shirazeh } = useGetShirazeh()

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
      rectangle: false,
      shirazehKhoroug: "",
      shirazehVouroud: "",
      cheleh: "",
      chelehKhoroug: "",
      chelehVouroud: "",
      gereh: "",
      gerehKhoroug: "",
      gerehVouroud: "",
    },
    // resolver: zodResolver(AddCarpetSchema),
  });
  const [isRectangle, setIsRectangle] = useState(true);

  const handleRectangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(isRectangle);

    if (isRectangle == true) {
      setIsRectangle(false);
      console.log(isRectangle);
      methods.setValue("rectangle", isRectangle);
    } else {
      setIsRectangle(true);
      methods.setValue("rectangle", isRectangle);
    }
  };

  const arz = methods.watch("arz");
  const tool = methods.watch("tool");
  useEffect(() => {
    if (arz && tool) {
      const calculatedMetraj = Number(arz) * Number(tool);
      methods.setValue("metraj", String(calculatedMetraj)); // Set the value of 'metraj'(calculatedMetraj); // Set the value of 'metraj'
    }
  }, [arz, tool, methods.setValue]);
  const handleSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <>
      <Layout>
        <section className="flex flex-col min-h-screen w-full py-6 px-4 items-center overflow-auto">
          <h1 className="text-3xl font-bold mb-14">ویرایش قالی</h1>

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
                  // checked={true}
                  label={"مستطیل"}
                  onChange={handleRectangleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7 rounded-tr-md rounded-tl-md">
              <SelectableInputField
                name="arz"
                data={isRectangle ? CircleSizes?.data : Widths?.data}
                placeholder={!isRectangle ? "انتخاب عرض" : "انتخاب شعاع"}
                getRealValue={(value: string) => {
                  methods.setValue("arz", value);
                }}
                className={`z-40`}
              />
              <SelectableInputField
                name="tool"
                data={isRectangle ? CircleSizes?.data : Widths?.data}
                placeholder={!isRectangle ? "انتخاب طول" : "انتخاب شعاع"}
                getRealValue={(value: string) => {
                  methods.setValue("tool", value);
                }}
                className={`z-30`}
              />
              <SimpleInputField name="metraj" label={"متراژ"} readOnly />
              <SelectableInputField
                name="naghsheh"
                data={designs?.data}
                placeholder={"انتخاب نقشه"}
                getValue={(value: string) => {
                  methods.setValue("naghsheh", value);
                }}
                className={"z-20"}
              />
              <SelectableInputField
                name="rang"
                data={colors?.data}
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
                data={Shirazeh?.data}
                placeholder={"انتخاب شیرازه"}
                getRealValue={(value: string) => {
                  methods.setValue("shirazeh", value);
                }}
                className={"z-40"}
              />
              <SimpleInputField name="shirazehVouroud" label={"تاریخ ورود"} />
              <SimpleInputField name="shirazehKhoroug" label={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center bg-[#8b97ff] py-7 ">
            <SelectableInputField
                name="gereh"
                data={Gereh?.data}
                placeholder={"انتخاب گره"}
                getRealValue={(value: string) => {
                  methods.setValue("gereh", value);
                }}
                className={"z-30"}
              />
              <SimpleInputField name="gerehVouroud" label={"تاریخ ورود"} />
              <SimpleInputField name="gerehKhoroug" label={"تاریخ خروج"} />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
            <SelectableInputField
                name="cheleh"
                data={Cheleh?.data}
                placeholder={"انتخاب چله"}
                getRealValue={(value: string) => {
                  methods.setValue("cheleh", value);
                }}
                className={"z-30"}
              />
              <SimpleInputField name="chelehVouroud" label={"تاریخ ورود"} />
              <SimpleInputField name="chelehKhoroug" label={"تاریخ خروج"} />
            </div>

            <div className="flex justify-between items-center mt-7">
              <CheckBoxInputField name="send" label={"ارسال شده"} />
              <div className="flex justify-center items-center gap-2">
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">
                  حذف
                </button>
                <button className="bg-gray-200 px-5 py-2 rounded-md text-xl text-gray-600">
                  ویرایش
                </button>
              </div>
            </div>
          </Form>
        </section>
      </Layout>
    </>
  );
}

export default EditCarpet;
