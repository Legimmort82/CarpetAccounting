import { FormProvider } from "react-hook-form";

type props = {
    methods?: any;
    className?: string;
    onSubmit: any;
    children: any;
};

const Form = ({ methods, className, onSubmit, children }: props) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;