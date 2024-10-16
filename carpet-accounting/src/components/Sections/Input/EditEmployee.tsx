import Layout from "@/components/Layout/Layout";
import {
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetSkills from "@/api/Employees/getSkills";
import useGetAllEmployees from "@/api/Employees/getAllEmployees";
import useUpdateEmployee from "@/api/Employees/updateEmployee";
import useDeleteEmployee from "@/api/Employees/removeEmployee";

type FindPerson = {
  id: number;
};
function EditEmployee() {
  const [section, setSection] = useState("");
  const { data: AllEmployees } = useGetAllEmployees();
  const router = useRouter();
  const EmployeeId = router.query?.employeeId;
  const updateEmployee = useUpdateEmployee(EmployeeId);
  const deleteEmployee = useDeleteEmployee(EmployeeId);
  const { data: Skills } = useGetSkills();
  const handleDeleteEmployee = () => {
    deleteEmployee.mutate(undefined,    
      {
        onSuccess: (res) => {
          console.log(res);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  const methods = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      section_name: "",
    },
    // resolver: zodResolver(),
  });
  useEffect(() => {
    if (AllEmployees) {
      const findEmployee = AllEmployees?.data.find(
        (employee: FindPerson) =>
          employee.id == Number(router.query?.employeeId)
      );
      // console.log(findEmployee);
      setSection(findEmployee?.section);
      methods.reset({
        name: findEmployee?.name,
        last_name: findEmployee?.last_name,
        section_name: findEmployee?.section,
      });
    }
  }, [AllEmployees]);

  const handleSubmit = (data: object) => {
    console.log(data);
    updateEmployee.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => console.log(error),
    });
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-10 text-2xl font-semibold">ویرایش کردن کارکنان</h2>
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="w-[90%] rounded-xl bg-[#050A30] px-4 py-10"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <SimpleInputField name="name" placeholder="نام کامل" />
            <SelectableInputField
              name="section_name"
              data={Skills?.data}
              getRealValue={(value: string) =>
                methods.setValue("section_name", value)
              }
              placeholder="انتخاب مهارت"
              selectedBefore={section}
            />
            <button type="submit" className="bg-[#5865c2] px-6 py-2 rounded-xl">
              ویرایش
            </button>
          </div>
        </Form>
        <button
              className="bg- bg-red-500 mt-6 px-6 py-2 rounded-xl"
              onClick={handleDeleteEmployee}
            >
              حذف
            </button>
      </div>
    </Layout>
  );
}

export default EditEmployee;
