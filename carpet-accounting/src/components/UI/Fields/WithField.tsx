import { useController, FieldValues } from "react-hook-form";
import { ComponentType, ForwardRefExoticComponent, RefAttributes } from "react";

type FieldProps<T extends FieldValues> = {
  name: keyof T;
  [key: string]: unknown; // Allows passing additional props
};
type Props = Record<string, unknown>;
interface WithFieldProps {
  Comp: ComponentType<Props> | ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>>;
}
const withField = ({ Comp }: WithFieldProps) => {
  return function Field<T extends FieldValues>({ name, ...props }: FieldProps<T>) {
    const {
      field, // ref is removed, destructured separately
      fieldState,
    } = useController({
      name: name as string, // necessary for useController
      rules: {},
    });

    return (
      <Comp
        {...field}
        error={fieldState.error?.message}
        {...props}
      />
    );
  };
};

export default withField;
