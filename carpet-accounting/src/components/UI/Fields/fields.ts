import LoginInput from "../Inputs/LoginInput";
import SelectableInput from "../Inputs/SelectableInput";
import SimpleInput from "../Inputs/SimpleInput";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import withField from "./WithField";
import SelectByName from "../Inputs/SelectByName";
import TextareaInp from "../Inputs/TextArea";


export const LoginInputField = withField({ Comp: LoginInput});
export const SelectableInputField = withField({ Comp: SelectableInput});
export const SelectByNameInputField = withField({ Comp: SelectByName});
export const SimpleInputField = withField({ Comp: SimpleInput});
export const TextareaField = withField({ Comp: TextareaInp});
export const CheckBoxInputField = withField({ Comp: CheckBoxInput });
