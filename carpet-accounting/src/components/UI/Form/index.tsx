import React from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>; // Use T extends FieldValues for the form data type
  className?: string;
  onSubmit: SubmitHandler<T>; // Use T for the form data type
  children: React.ReactNode;
};

const Form = <T extends FieldValues>({ methods, className, onSubmit, children }: Props<T>) => {
  if (!methods) {
    throw new Error('Form component requires a "methods" prop');
  }
  return (
    <FormProvider {...methods}> {/* Spread the methods object */}
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