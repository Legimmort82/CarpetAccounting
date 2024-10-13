import useGetSkills from "@/api/Employees/getSkills";
import Layout from "@/components/Layout/Layout";
import {
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const skills = [
  { id: 1, value: "شیرازه" },
  { id: 2, value: "چله" },
  { id: 3, value: "گره" },
];

function AddEmployee() {
  const { data: Skills } = useGetSkills()
  console.log(Skills);
  
  const methods = useForm({
    defaultValues: {
      name: "",
      maharat: "",
    },
    // resolver: zodResolver(),
  });

  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-10 text-2xl font-semibold">اضافه کردن کارکنان جدید</h2>
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="w-[90%] rounded-xl bg-[#050A30] px-4 py-10"
        >
          <div className="flex justify-center gap-6 items-center">
            <SimpleInputField name="fullName" placeholder="نام کامل" />
            <SelectableInputField
              name="skill"
              data={Skills?.data}
              placeholder="انتخاب مهارت"
            />
            <button className="bg-[#aab1e6] px-6 py-2 rounded-xl">
              انصراف
            </button>
            <button type="submit" className="bg-[#5865c2] px-6 py-2 rounded-xl">
              اضافه کردن
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default AddEmployee;