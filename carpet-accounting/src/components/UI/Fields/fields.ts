import LoginInput from "../Inputs/LoginInput";
import SelectableInput from "../Inputs/SelectableInput";
import SimpleInput from "../Inputs/SimpleInput";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import withField from "./WithField";
import SelectByName from "../Inputs/SelectByName";
import { ComponentType, RefAttributes } from "react";
interface Props {
    type?: string
    value?: string
    error?: string
    placeholder?: string
    name: string
    required?: boolean
    onChange?: () => void
    text?: string
    isEye?: boolean
  }
  interface PropsSelect {
    type?: string
    value?: string
    error?: string
    placeholder?: string
    name: string
    required?: boolean
    onChange?: () => void
    text?: string
    isEye?: boolean
    data?: any // Add this property to the Props interface
  }
export const LoginInputField = withField({ Comp: LoginInput  as ComponentType<Props & RefAttributes<HTMLInputElement>>});
export const SelectableInputField = withField({ Comp: SelectableInput  as ComponentType<PropsSelect > });
export const SelectByNameInputField = withField({ Comp: SelectByName  as ComponentType<PropsSelect>});
export const SimpleInputField = withField({ Comp: SimpleInput  as ComponentType<Props>});
export const CheckBoxInputField = withField({ Comp: CheckBoxInput as ComponentType<Props> });
