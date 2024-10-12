import Layout from "@/components/Layout/Layout";
import {
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import employeeData from "@/data/employees.json"
import useGetSkills from "@/api/Carpets/Skills/getSkills";

// const skills = [
//   { id: 1, value: "شیرازه" },
//   { id: 2, value: "چله" },
//   { id: 3, value: "گره" },
// ];

function EditEmployee() {
  const router = useRouter();
  const findEmployee = employeeData.find(
    (employee) => employee.shomareh == Number(router.query?.employeeId)
  );

  const { data: Skills } = useGetSkills();

  const methods = useForm({
    defaultValues: {
      name: "",
      maharat: "",
    },
    // resolver: zodResolver(),
  });
  useEffect(() => {
    if (findEmployee) {
      methods.reset({
        name: findEmployee?.name,
        maharat: findEmployee?.maharat
      });
    }
  }, [findEmployee, methods.reset]);

  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-10 text-2xl font-semibold">
          ویرایش کردن کارکنان
        </h2>
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="w-[90%] rounded-xl bg-[#050A30] px-4 py-10"
        >
          <div className="flex justify-center gap-6 items-center">
            <SimpleInputField name="name" placeholder="نام کامل" />
            <SelectableInputField
              name="maharat"
              data={Skills?.data}
              placeholder="انتخاب مهارت"
            />
            <button className="bg-[#aab1e6] px-6 py-2 rounded-xl">
              حذف
            </button>
            <button type="submit" className="bg-[#5865c2] px-6 py-2 rounded-xl">
              ویرایش
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default EditEmployee;