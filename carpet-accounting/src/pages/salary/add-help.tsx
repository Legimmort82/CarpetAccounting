import React from "react";
import useGetSkills from "@/api/Employees/getSkills";
import Layout from "@/components/Layout/Layout";
import {
  SelectByNameInputField,
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { useForm } from "react-hook-form";
import useGetAllEmployees from "@/api/Employees/getAllEmployees";
import DateInput from "@/components/UI/Inputs/DateInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddHelpSchema } from "@/schemas/AddHelp";
import useAddHelp from "@/api/Helps/addHelp";
import useGetHelps from "@/api/Helps/getHelps";
import useGetSingleHelps from "@/api/Helps/getSingleHelp";

const AddHelp = () => {
  const { data: Employees } = useGetAllEmployees();
  const {data:allHelps}= useGetHelps()
  const {data:singleHelp}=useGetSingleHelps()
  console.log(singleHelp);
  
  console.log(allHelps);
  
  const mutateAddHelp = useAddHelp();
  const methods = useForm({
    defaultValues: {
      money: 0,
      date: "",
      worker: "",
    },
    resolver: zodResolver(AddHelpSchema),
  });

  const handleSubmit = (data: object) => {
    console.log(data);
    mutateAddHelp.mutate(data, {
      onSuccess: (res) => console.log(res),
      onError: (error) => console.log(error),
    });
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-10 text-2xl font-semibold">ثبت مساعده جدید</h2>
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="w-[90%] rounded-xl bg-[#050A30] px-4 py-10"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <SelectByNameInputField
              name="worker"
              data={Employees?.data}
              getValue={(value: string) => {
                methods.setValue("worker", value);
              }}
              placeholder="انتخاب کارکنان"
            />
            <DateInput
              label="تاریخ"
              className="text-white"
              id="date"
              error={methods.formState.errors?.date}
              getValue={(value) => {
                methods.setValue("date", value);
              }}
            />
            <SimpleInputField name="money" placeholder="مبلغ" type="number" />
            <button className="bg-[#aab1e6] px-6 py-2 rounded-xl font-semibold">
              انصراف
            </button>
            <button
              type="submit"
              className="bg-[#5865c2] px-6 py-2 rounded-xl font-semibold"
            >
              اضافه کردن
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default AddHelp;
