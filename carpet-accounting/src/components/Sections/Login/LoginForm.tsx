import Form from '@/components/UI/Form';
import { useForm } from 'react-hook-form';
import { LoginInputField } from '@/components/UI/Fields/fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas/LoginSchema';

function LoginForm() {
  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    }, 
    resolver: zodResolver(LoginSchema)
  })
  const handleSubmit = (data: object) => {
    console.log(data);
  }
  return (
    <>
      <section className='flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-bold">ورود</h1>
        <Form onSubmit={handleSubmit} methods={methods} className='w-[70%] lg:w-[50%] mt-10 flex flex-col items-center justify-center'>
          <LoginInputField name='username' text='نام کاربری' />
          <LoginInputField name='password' text='رمز عبور' />
          <button type='submit' className='w-full text-[20px] mt-12 h-[45px] bg-[#050A30] text-white rounded-lg'>ورود</button>
        </Form>
      </section>
    </>
  )
}

export default LoginForm;