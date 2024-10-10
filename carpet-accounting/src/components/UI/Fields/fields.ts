import LoginInput from "../Inputs/LoginInput";
import SelectableInput from "../Inputs/SelectableInput";
import SimpleInput from "../Inputs/SimpleInput";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import withField from "./WithField";

export const LoginInputField = withField({ Comp: LoginInput });
export const SelectableInputField = withField({ Comp: SelectableInput });
export const SimpleInputField = withField({ Comp: SimpleInput });
export const CheckBoxInputField = withField({ Comp: CheckBoxInput });
