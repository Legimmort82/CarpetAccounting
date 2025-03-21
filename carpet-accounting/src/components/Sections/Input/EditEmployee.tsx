import Layout from "@/components/Layout/Layout";
import {
  SelectableInputField,
  SimpleInputField,
  TextareaField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetSkills from "@/api/Employees/getSkills";
import useGetAllEmployees from "@/api/Employees/getAllEmployees";
import useUpdateEmployee from "@/api/Employees/updateEmployee";
import toast, { Toaster } from "react-hot-toast";
import { apiClient } from "@/api/instance";

type FindPerson = {
  id: number;
};
function EditEmployee() {
  const router = useRouter();
  useEffect(() => {
    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!accessToken) {
      router.push("/auth/login"); // no token, redirect to login
      return;
    }

    // Verify the token with the API
    apiClient
      .get("/accounts/token-verify", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // Token is valid
        console.log(res);
      })
      .catch(() => {
        // Token is invalid or expired
        localStorage.removeItem("accessToken"); // remove invalid token
        router.push("/auth/login");
      });
  }, [router]);

  const [section, setSection] = useState("");
  const { data: AllEmployees } = useGetAllEmployees();

  const EmployeeId = router.query?.employeeId;
  const updateEmployee = useUpdateEmployee(EmployeeId);
  const { data: Skills } = useGetSkills();

  const methods = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      section_name: "",
      landline_phone: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (AllEmployees) {
      const findEmployee = AllEmployees?.data.find(
        (employee: FindPerson) =>
          employee.id == Number(router.query?.employeeId)
      )
      setSection(findEmployee?.section);
      methods.reset({
        name: findEmployee?.name ? findEmployee?.name : "",
        last_name: findEmployee?.last_name,
        section_name: findEmployee?.section,
        landline_phone: findEmployee?.landline_phone
          ? findEmployee?.landline_phone
          : "",
        address: findEmployee?.address ? findEmployee?.address : "",
        phone: findEmployee?.phone ? findEmployee?.phone : "",
      });
    }
  }, [AllEmployees, methods, router.query?.employeeId]);

  const handleSubmit = (data: object) => {
    console.log(data);
    updateEmployee.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        toast.success("فرد مورد نظر ویرایش شد");
      },
      // onError: (error) => console.log(error),
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
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6 items-center">
            <SimpleInputField name="name" placeholder="نام " />
            <SimpleInputField name="last_name" placeholder="نام خانوادگی" />
            <SimpleInputField name="phone" placeholder="همراه" />
            <SimpleInputField name="landline_phone" placeholder="تلفن ثابت" />
            <TextareaField name="address" placeholder="آدرس"/>
            <SelectableInputField
              name="section_name"
              data={Skills?.data}
              getRealValue={(value: string) =>
                methods.setValue("section_name", value)
              }
              placeholder="انتخاب مهارت"
              selectedBefore={section}
            />
            <button
              type="submit"
              className="bg-[#5865c2] hover:bg-[#aab1e6] duration-200 px-6 py-2 rounded-xl"
            >
              ویرایش
            </button>
          </div>
        </Form>
        <Toaster />
        {/* <button
              className="bg- bg-red-500 mt-6 px-6 py-2 rounded-xl"
              onClick={handleDeleteEmployee}
            >
              حذف
            </button> */}
      </div>
    </Layout>
  );
}

export default EditEmployee;
