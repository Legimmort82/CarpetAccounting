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
import useGetGereh from "@/api/Employees/getGereh";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCarpetSchema } from "@/schemas/AddCarpetSchema";
import useAddCarpet from "@/api/Carpets/addCarpet";
import useGetAllCarpets from "@/api/Carpets/getAllCarpets";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "@/components/UI/Toast/CustomToast";

function AddCarpet() {
  const { data: colors } = useGetAllColors();
  const { data: designs } = useGetDesigns();
  const { data: CircleSizes } = useGetCircleSizes();
  const { data: Widths } = useGetRectangleWidth();
  const { data: Lengths } = useGetRectangleLength();
  const { data: Cheleh } = useGetCheleh();
  const { data: Gereh } = useGetGereh();
  const { data: Shirazeh } = useGetShirazeh();
  const {data:AllCarpets}= useGetAllCarpets()
  const mutateCarpet = useAddCarpet();
  const methods = useForm({
    defaultValues: {
      arz: "",
      tool: "",
      metraj: "",
      naghsheh: "",
      rang: "",
      serial: "",
      code: "",
      isRectangle: true,
      shirazeh: "",
      shirazehKhoroug: "",
      shirazehVouroud: "",
      cheleh: "",
      chelehKhoroug: "",
      chelehVouroud: "",
      gereh: "",
      gerehKhoroug: "",
      gerehVouroud: "",
      send: false,
    },
    resolver: zodResolver(AddCarpetSchema),
  });

  const [isRectangle, setIsRectangle] = useState(true);
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
      methods.setValue("metraj", String(calculatedMetraj));
    }
  }, [arz, tool, methods.setValue]);

  const handleSubmit = (data: object) => {
    mutateCarpet.mutate(data, {
      onSuccess: (res) => {console.log(res)
      toast.success("فرش اضافه شد")
      methods.reset()
      }
      ,
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(AllCarpets);
  };

  return (
    <Layout>
      <section className="flex flex-col min-h-screen w-full py-6 px-4 mt-7 items-center justify-center overflow-auto">
        <div className="bg-[#0e1549] rounded-md">
          <div className="bg-[#070a2b] w-full py-16 border-b-2 rounded-t-md border-white px-6 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-white">اضافه کردن قالی</h1>
          </div>

          <Form
            onSubmit={handleSubmit}
            methods={methods}
            className="flex flex-col gap-y-1"
          >
            <div className="flex items-center justify-center gap-6 self-start w-full py-7 px-6  rounded-tr-md rounded-tl-md">
              <h2 className="text-xl text-white font-bold self-start pl-5">
                نوع قالی:
              </h2>

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
              <SimpleInputField
                name="metraj"
                label={"متراژ"}
                readOnly
                className={"text-white"}
              />
              <SelectableInputField
                name="naghsheh"
                data={designs?.data}
                placeholder={"انتخاب نقشه"}
                getRealValue={(value: string) => {
                  methods.setValue("naghsheh", value);
                }}
                className={"z-20"}
              />
              <SelectableInputField
                name="rang"
                data={colors?.data}
                placeholder="انتخاب رنگ"
                getRealValue={(value: string) => {
                  methods.setValue("rang", value);
                }}
                className={"z-50"}
              />
              <SimpleInputField
                name="serial"
                label={"سریال"}
                className={"text-white"}
              />
              <SimpleInputField
                name="code"
                label={"کد"}
                className={"text-white"}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-14 items-center  py-7 ">
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
                className={"text-white"}
                id="shirazehVouroud"
              />
              <DateInput
                label="تاریخ خروج"
                getValue={(value) => {
                  methods.setValue("shirazehKhoroug", value);
                }}
                className={"text-white"}
                id="shirazehKhoroug"
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
                className={"z-30"}
              />
              <DateInput
                label="تاریخ ورود"
                getValue={(value) => {
                  methods.setValue("gerehVouroud", value);
                }}
                className={"text-white"}
                id="gerehVouroud"
              />
              <DateInput
                label="تاریخ خروج"
                getValue={(value) => {
                  methods.setValue("gerehKhoroug", value);
                }}
                className={"text-white"}
                id="gerehKhoroug"
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
              />
              <DateInput
                label="تاریخ ورود"
                getValue={(value) => {
                  methods.setValue("chelehVouroud", value);
                }}
                className={"text-white"}
                id="chelehVouroud"
              />
              <DateInput
                label="تاریخ خروج"
                getValue={(value) => {
                  methods.setValue("chelehKhoroug", value);
                }}
                className={"text-white"}
                id="chelehKhoroug"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mt-7 px-8 pb-6">
              <CheckBoxInputField
                name="send"
                label={"ارسال شده"}
                checked={isSend}
                onChange={handleSendCheckbox}
                className={"text-white font-semibold"}
              />
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
          <Toaster/>
        </div>
      </section>
    </Layout>
  );
}

export default AddCarpet;
