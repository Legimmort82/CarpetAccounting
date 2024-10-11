import { forwardRef } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type props = {
  value?: Date;
  error?: string;
  placeholder?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  getValue?: (value: string) => void;
};

const DateInput = forwardRef(
  (
    {
      value,
      name,
      label,
      error,
      placeholder,
      readOnly,
      required,
      getValue,
    }: props,
    ref: any
  ) => {
    const handleChange = (date: DateObject) => {
      if (getValue) getValue(date.year + "/" + date.month + "/" + date.day);
      console.log(date.year + "/" + date.month + "/" + date.day);
    };
    return (
      <div className="flex gap-2 items-center">
        <label htmlFor="">{label}</label>
        <DatePicker
          name={name}
          value={value}
          onChange={handleChange}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom"
          fixRelativePosition
          style={{
            width: "100%",
            backgroundColor: "#E5E7EB",
            border: "none",
            borderRadius: "4px",
            paddingTop: "8px",
            paddingBottom: "8px",
            textAlign: "center",
            height: "40px",
            fontSize: "18px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        />
      </div>
    );
  }
);

export default DateInput;
