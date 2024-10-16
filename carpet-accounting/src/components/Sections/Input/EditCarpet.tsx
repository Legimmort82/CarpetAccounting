import Layout from "@/components/Layout/Layout";
import {
  CheckBoxInputField,
  SelectByNameInputField,
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
import useGetCheleh from "@/api/Employees/getCheleh";
import useGetGereh from "@/api/Employees/getGereh";
import useGetShirazeh from "@/api/Employees/getShirazeh";
import DateInput from "@/components/UI/Inputs/DateInput";
import { useRouter } from "next/router";
import { CarpetData } from "@/data/05data"
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCarpetSchema } from "@/schemas/AddCarpetSchema";
function EditCarpet() {
  const router = useRouter();
  const findCarpet = CarpetData.find(
    (carpet) => carpet.id == Number(router.query?.carpetId)
  );

  const { data: colors } = useGetAllColors();
  const { data: designs } = useGetDesigns();
  const { data: CircleSizes } = useGetCircleSizes();
  const { data: Widths } = useGetRectangleWidth();
  const { data: Lengths } = useGetRectangleLength();
  const { data: Cheleh } = useGetCheleh();
  const { data: Gereh } = useGetGereh();
  const { data: Shirazeh } = useGetShirazeh();

  const methods = useForm({
    defaultValues: {
      arz: "",
      tool: "",
      metraj: "",
      naghsheh: "",
      rang: "",
      serial: "",
      send: false,
      code: "",
      isRectangle: false,
      shirazeh: "",
      shirazehKhoroug: "",
      shirazehVouroud: "",
      cheleh: "",
      chelehKhoroug: "",
      chelehVouroud: "",
      gereh: "",
      gerehKhoroug: "",
      gerehVouroud: "",
    },
    resolver: zodResolver(AddCarpetSchema),
  });
  useEffect(() => {
    if (findCarpet) {
      methods.reset({
        arz: findCarpet?.arz,
        tool: findCarpet?.tool,
        naghsheh: findCarpet?.naghsheh,
        rang: findCarpet?.rang,
        serial: findCarpet?.serial,
        code: findCarpet?.code,
        send: findCarpet?.ersalshodeh,
        shirazeh: findCarpet?.shirazeh,
        cheleh: findCarpet?.cheleh,
        gereh: findCarpet?.gereh,
        isRectangle: findCarpet?.isRectangle,
        shirazehVouroud: findCarpet?.shirazehVouroud,
        shirazehKhoroug: findCarpet?.shirazehKhoroug,
        chelehVouroud: findCarpet?.chelehVouroud,
        chelehKhoroug: findCarpet?.chelehKhroug,
        gerehVouroud: findCarpet?.gerehVouroud,
        gerehKhoroug: findCarpet?.gerehKhoroug,
      });
      setIsRectangle(findCarpet?.isRectangle ? findCarpet?.isRectangle : false);
      setIsSend(findCarpet?.ersalshodeh ? findCarpet?.ersalshodeh : false);
    }
  }, [findCarpet, methods.reset]);
  const [isRectangle, setIsRectangle] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const handleRectangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRectangle(e.target.checked);
    methods.setValue("isRectangle", e.target.checked);
  };
  const handleSendCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSend(e.target.checked);
    methods.setValue("send", e.target.checked);
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
        <section className="flex flex-col min-h-screen w-full py-6 px-4 items-center justify-center overflow-auto">
          <div className="bg-[#0e1549] rounded-md">

            <div className="bg-[#070a2b] w-full py-16 border-b-2 rounded-t-md border-white px-6 flex justify-center items-center">

              <h1 className="text-3xl font-bold text-white">ویرایش کردن قالی</h1>
            </div>

            <Form
              onSubmit={handleSubmit}
              methods={methods}
              className="flex flex-col gap-y-1"
            >
              <div className="flex items-center justify-center gap-6 self-start w-full py-7 px-6  rounded-tr-md rounded-tl-md">
                <h2 className="text-xl text-white font-bold self-start pl-5">نوع قالی:</h2>

                <div className="flex flex-wrap gap-5 items-center">
                  <CheckBoxInputField
                    name="isRectangle"
                    checked={isRectangle}
                    label={"مستطیل"}
                    className={"text-white"}
                    onChange={handleRectangleChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-12 items-center  py-7">
                <SelectableInputField
                  name="arz"
                  data={!isRectangle ? CircleSizes?.data : Widths?.data}
                  placeholder={isRectangle ? "انتخاب عرض" : "انتخاب شعاع"}
                  getRealValue={(value: string) => {
                    methods.setValue("arz", value);
                  }}
                  selectedBefore={findCarpet?.arz}
                  className={`z-50`}
                />
                <SelectableInputField
                  name="tool"
                  data={!isRectangle ? CircleSizes?.data : Lengths?.data}
                  placeholder={isRectangle ? "انتخاب طول" : "انتخاب شعاع"}
                  getRealValue={(value: string) => {
                    methods.setValue("tool", value);
                  }}
                  selectedBefore={findCarpet?.tool}
                  className={`z-50`}
                />
                <SimpleInputField name="metraj" label={"متراژ"} readOnly className={"text-white"} />
                <SelectableInputField
                  name="naghsheh"
                  data={designs?.data}
                  placeholder={"انتخاب نقشه"}
                  getRealValue={(value: string) => {
                    methods.setValue("naghsheh", value);
                  }}
                  selectedBefore={findCarpet?.naghsheh}
                  className={"z-20"}
                />
                <SelectableInputField
                  name="rang"
                  data={colors?.data}
                  placeholder="انتخاب رنگ"
                  getRealValue={(value: string) => {
                    methods.setValue("rang", value);
                  }}
                  selectedBefore={findCarpet?.rang}
                />
                <SimpleInputField name="serial" label={"سریال"} className={"text-white"} />
                <SimpleInputField name="code" label={"کد"} className={"text-white"} />
              </div>
              <div className="flex flex-wrap justify-center gap-14 items-center  py-7 ">
                <SelectByNameInputField
                  name="shirazeh"
                  data={Shirazeh?.data}
                  placeholder="انتخاب شیرازه"
                  getRealValue={(value: string) => {
                    methods.setValue("shirazeh", value);
                  }}
                  selectedBefore={findCarpet?.shirazeh}
                  className={"z-40"}
                />
                <DateInput
                  label="تاریخ ورود"
                  getValue={(value) => {
                    methods.setValue("shirazehVouroud", value);
                  }}
                  selected={findCarpet?.shirazehVouroud}
                  className={"text-white"}
                />
                <DateInput
                  label="تاریخ خروج"
                  getValue={(value) => {
                    methods.setValue("shirazehKhoroug", value);
                  }}
                  selected={findCarpet?.shirazehKhoroug}
                  className={"text-white"}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-14 items-center py-7 ">
                <SelectByNameInputField
                  name="gereh"
                  data={Gereh?.data}
                  placeholder="انتخاب گره"
                  getRealValue={(value: string) => {
                    methods.setValue("gereh", value);
                  }}
                  selectedBefore={findCarpet?.gereh}
                  className={"z-30"}
                />
                <DateInput
                  label="تاریخ ورود"
                  getValue={(value) => {
                    methods.setValue("gerehVouroud", value);
                  }}
                  selected={findCarpet?.gerehVouroud}
                  className={"text-white"}
                />
                <DateInput
                  label="تاریخ خروج"
                  getValue={(value) => {
                    methods.setValue("gerehKhoroug", value);
                  }}
                  selected={findCarpet?.gerehKhoroug}
                  className={"text-white"}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-14 items-center py-7 rounded-br-md rounded-bl-md">
                <SelectByNameInputField
                  name="cheleh"
                  data={Cheleh?.data}
                  placeholder="انتخاب چله"
                  getRealValue={(value: string) => {
                    methods.setValue("cheleh", value);
                  }}
                  selectedBefore={findCarpet?.cheleh}
                  className={"z-20"}
                />
                <DateInput
                  label="تاریخ ورود"
                  getValue={(value) => {
                    methods.setValue("chelehVouroud", value);
                  }}
                  selected={findCarpet?.chelehVouroud}
                  className={"text-white"}
                />
                <DateInput
                  label="تاریخ خروج"
                  getValue={(value) => {
                    methods.setValue("chelehKhoroug", value);
                  }}
                  selected={findCarpet?.chelehKhroug}
                  className={"text-white"}
                />
              </div>

              <div className="flex justify-between items-center mt-7 px-8 pb-6">
                <CheckBoxInputField name="send" label={"ارسال شده"} checked={isSend} onChange={handleSendCheckbox} className={"text-white font-semibold"} />
                <div className="flex justify-center items-center gap-2">
                  <button className="bg-white font-semibold px-5 py-2 rounded-md text-xl">
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-white font-semibold px-5 py-2 rounded-md text-xl"
                  >
                    اضافه کردن
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default EditCarpet;
