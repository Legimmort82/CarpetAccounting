import { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { log } from "console";

type props = {
  error?: string;
  placeholder?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  selected?: string;
  className?:string;
  getValue?: (value: string) => void;
};

const DateInput = forwardRef(
  (
    {
      name,
      label,
      error,
      placeholder,
      readOnly,
      required,
      selected,
      getValue,
      className,
    }: props,
    ref: any
  ) => {
    const [value, setValue] = useState<Value>();

    const handleChange = (date: DateObject) => {
      setValue(date);
      if (getValue) getValue(date.year + "/" + date.month + "/" + date.day);
    };

    return (
      <div className="flex gap-2 items-center">
        <label htmlFor="" className={className}>{label}</label>
        <DatePicker
          placeholder={selected}
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
