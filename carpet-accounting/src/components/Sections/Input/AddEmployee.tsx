import useAddEmployee from "@/api/Employees/addEmployee";
import useGetAllEmployees from "@/api/Employees/getAllEmployees";
import useGetSkills from "@/api/Employees/getSkills";
import Layout from "@/components/Layout/Layout";
import {
  SelectableInputField,
  SimpleInputField,
} from "@/components/UI/Fields/fields";
import Form from "@/components/UI/Form";
import { AddEmployeeSchema } from "@/schemas/AddEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function AddEmployee() {
  const { data: Skills } = useGetSkills();
  const mutateAddPerson = useAddEmployee();
  const {data:allEmployees}= useGetAllEmployees()
  const methods = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      section_name: "",
    },
    resolver: zodResolver(AddEmployeeSchema),
  });

  const handleSubmit = (data: object) => {
    console.log(data);
    mutateAddPerson.mutate(data, {
      onSuccess: (res) => {console.log(res) 
        console.log(allEmployees);
      },
      onError: (error) => console.log(error),
    });
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-10 text-2xl font-semibold">
          اضافه کردن کارکنان جدید
        </h2>
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          className="w-[90%] rounded-xl bg-[#050A30] px-4 py-10"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <SimpleInputField name="name" placeholder="نام" />
            <SimpleInputField name="last_name" placeholder="نام خانوادگی" />
            <SelectableInputField
              name="section_name"
              data={Skills?.data}
              placeholder="انتخاب مهارت"
              getRealValue={(value: string) => {
                methods.setValue("section_name", value);
              }}
            />
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
}

export default AddEmployee;
