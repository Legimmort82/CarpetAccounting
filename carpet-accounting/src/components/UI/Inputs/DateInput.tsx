import { forwardRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type props = {
  value?: Date
  error?: string
  placeholder?: string
  name?: string
  readOnly?: boolean
  required?: boolean
  label?: string
  onChange?: (value: Date) => void
}

const DateInput = forwardRef(
  (
    {
      value,
      error,
      placeholder,
      name,
      readOnly,
      required,
      label,
      onChange,
    }: props,
    ref: any
  ) => {

    const [date, setDate] = useState<DateObject | null>(null);
    return (
      <>
        <DatePicker
          name={name}
          value={date}
          onChange={(newDate) => setDate(newDate as DateObject)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="center"  
        />
      </>
    );
  }
);

export default DateInput;