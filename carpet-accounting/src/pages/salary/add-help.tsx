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

const AddHelp = () => {
  const { data: Employees } = useGetAllEmployees();

  const methods = useForm({
    defaultValues: {
      price: 0,
      date:"",
      employee: "",
    },
    // resolver: zodResolver(),
  });

  const handleSubmit = (data: object) => {
    console.log(data);
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
          <div className="flex justify-center gap-6 items-center">
            <SelectByNameInputField
              name="employee"
              data={Employees?.data}
              placeholder="انتخاب کارکنان"
            />
            <DateInput
              label="تاریخ"
              className="text-white"
              id="date"
              getValue={(value) => {
                methods.setValue("date", value);
              }}
            />
            <SimpleInputField name="price" placeholder="مبلغ" />
            <button className="bg-[#aab1e6] px-6 py-2 rounded-xl font-semibold">
              انصراف
            </button>
            <button type="submit" className="bg-[#5865c2] px-6 py-2 rounded-xl font-semibold">
              اضافه کردن
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default AddHelp;
