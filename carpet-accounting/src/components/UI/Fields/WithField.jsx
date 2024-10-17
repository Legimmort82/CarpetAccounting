import { useController } from "react-hook-form";

// type FieldProps<T extends FieldValues> = {
//   name: keyof T;
//   [key: string]: unknown; // Allows passing additional props
// };
// type Props = Record<string, unknown>;
// interface WithFieldProps {
//   Comp: ComponentType<Props> | ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>>;
// }
const withField = ({ Comp }) => {
  return function Field({ name, ...props }) {
    const {
      field, // ref is removed, destructured separately
      fieldState,
    } = useController({
      name, // necessary for useController
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
