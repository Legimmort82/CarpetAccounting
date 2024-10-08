import { useController } from "react-hook-form";
import { ForwardRefExoticComponent, JSXElementConstructor, RefAttributes } from "react";

type FieldProps = {
  name: string;
  required?: boolean | string;
  // control: any; // You might want to be more specific depending on your controller type
  [key: string]: any; // This allows passing additional props
};

type WithFieldProps = {
  Comp:  ForwardRefExoticComponent<any> | JSXElementConstructor<any>;
};

const withField = ({ Comp }: WithFieldProps) => {
  return function Field({ name, required, ...props }: FieldProps) {
    const {
      field: { ref, ...field },
      fieldState,
    } = useController({
      name,
      rules: {
        required: required === true ? "Please enter this field" : required,
      },
    });

    return (
      <Comp
        required={required}
        {...field}
        error={fieldState.error?.message}
        {...props}
      />
    );
  };
};

export default withField;
