import Layout from "@/components/Layout/Layout";
import Form from "@/components/UI/Form";
import { useForm } from "react-hook-form";
import {
  CheckBoxInputField,
  SelectByNameInputField,
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import useGetAllColors from "@/api/Carpets/Colors&Designs/getColors";
import { useEffect, useState } from "react";
import React from "react";
import useGetDesigns from "@/api/Carpets/Colors&Designs/getDesigns";
import useGetCircleSizes from "@/api/Carpets/Sizes/getCircleSizes";
import useGetRectangleWidth from "@/api/Carpets/Sizes/getRectangleWidth";
import useGetRectangleLength from "@/api/Carpets/Sizes/getRectangleLength";
import DateInput from "@/components/UI/Inputs/DateInput";
import useGetCheleh from "@/api/Employees/getCheleh";
import useGetShirazeh from "@/api/Employees/getShirazeh";
import useGetGereh from "@/api/Employees/getGereh"

function AddCarpet() {
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
      send: false,
      rectangle: true,
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
  const [isSend, setIsSend] = useState(false);

  const handleRectangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRectangle(e.target.checked);
    methods.setValue("rectangle", e.target.checked);
  };
  const handleSendCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSend(e.target.checked);
    methods.setValue("send", e.target.checked);
  }
  const arz = methods.watch("arz");
  const tool = methods.watch("tool");
  useEffect(() => {
    if (arz && tool) {
      const calculatedMetraj = Number(arz) * Number(tool);
      methods.setValue("metraj", String(calculatedMetraj));
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
                name="rectangle"
                checked={isRectangle}
                label={"مستطیل"}
                onChange={handleRectangleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 items-center bg-[#cbcfff] py-7">
            <SelectableInputField
              name="arz"
              data={!isRectangle ? CircleSizes?.data : Widths?.data}
              placeholder={isRectangle ? "انتخاب عرض" : "انتخاب شعاع"}
              getRealValue={(value: string) => {
                methods.setValue("arz", value);
              }}
              className={`z-50`}
            />
            <SelectableInputField
              name="tool"
              data={!isRectangle ? CircleSizes?.data : Lengths?.data}
              placeholder={isRectangle ? "انتخاب طول" : "انتخاب شعاع"}
              getRealValue={(value: string) => {
                methods.setValue("tool", value);
              }}
              className={`z-50`}
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
              className={"z-40"}
            />
            <SimpleInputField name="serial" label={"سریال"} />
            <SimpleInputField name="code" label={"کد"} />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#9fa8ff] py-7 ">
            <SelectByNameInputField
              name="shirazeh"
              data={Shirazeh?.data}
              placeholder="انتخاب شیرازه"
              getRealValue={(value: string) => {
                methods.setValue("shirazeh", value);
              }}
              className={"z-40"}
            />
            <DateInput
              label="تاریخ ورود"
              getValue={(value) => {
                methods.setValue("shirazehVouroud", value);
              }}
            />
            <DateInput
              label="تاریخ خروج"
              getValue={(value) => {
                methods.setValue("shirazehKhoroug", value);
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#8b97ff] py-7 ">
            <SelectByNameInputField
              name="gereh"
              data={Gereh?.data}
              placeholder="انتخاب گره"
              getRealValue={(value: string) => {
                methods.setValue("gereh", value);
              }}
              className={"z-30"}
            />
            <DateInput
              label="تاریخ ورود"
              getValue={(value) => {
                methods.setValue("gerehVouroud", value);
              }}
            />
            <DateInput
              label="تاریخ خروج"
              getValue={(value) => {
                methods.setValue("gerehKhoroug", value);
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-14 items-center bg-[#7684ff] py-7 rounded-br-md rounded-bl-md shadow-lg shadow-gray-300">
            <SelectByNameInputField
              name="cheleh"
              data={Cheleh?.data}
              placeholder="انتخاب چله"
              getRealValue={(value: string) => {
                methods.setValue("cheleh", value);
              }}
            />
            <DateInput
              label="تاریخ ورود"
              getValue={(value) => {
                methods.setValue("chelehVouroud", value);
              }}
            />
            <DateInput
              label="تاریخ خروج"
              getValue={(value) => {
                methods.setValue("chelehKhoroug", value);
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-7">
            <CheckBoxInputField name="send" label={"ارسال شده"} checked={isSend} onChange={handleSendCheckbox} />
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
