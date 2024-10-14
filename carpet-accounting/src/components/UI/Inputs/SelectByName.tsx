import Image from "next/image";
import React, { LegacyRef, forwardRef, useEffect, useState } from "react";
import downArrow from "@/assets/table/arrow-down-2.svg";
import search from "@/assets/table/search-solid.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

// const arrey = [
//   { value: "نارنجی", id: 1 },
//   { value: "سفید", id: 2 },
//   { value: "زرد", id: 3 },
//   { value: "آبی", id: 4 },
//   { value: "قرمز", id: 5 },
//   { value: "زرشکی", id: 6 },
//   { value: "سبز", id: 7 },
//   { value: "قهوه ای", id: 8 },
//   { value: "طوسی", id: 9 },
//   { value: "سرمه ای", id: 10 },
// ];

type props = {
  type?: string;
  value?: string;
  error?: string;
  getRealValue?: (value: string) => void;
  placeholder?: string;
  name?: string;
  data: { id: number; name: string; last_name: string }[];
  required?: boolean;
  getValue?: (value: number) => void;
  className?: string;
  selectedBefore?: string;
};

const SelectByName = forwardRef(
  (
    {
      type = "text",
      value,
      error,
      placeholder,
      name,
      data,
      required,
      getValue,
      getRealValue,
      selectedBefore,
      className,
    }: props,
    ref: any
  ) => {
    // const [color, setColor] = useState(data);
    const handleClickOutside = () => {
      setOpen(false);
    };
    const SelectRef = useOutsideClick({ handler: handleClickOutside });
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
      if (selectedBefore !== undefined) {
        setSelected(selectedBefore);
      }
    }, [selectedBefore]);
    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setInputValue(e.target.value)
      setSelected(e.target.value)
      getRealValue?.(e.target.value)
    }
    return (
      <>
        <div
        ref={SelectRef as LegacyRef<HTMLDivElement> | undefined}
          className={`font-medium z-20 h-10 cursor-pointer duration-300 hover:scale-[1.02] ${className}`}
        >
          <div
            className={`bg-gray-200 w-full p-2 flex items-center justify-between rounded-md
          ${selected ? "text-black" : "text-gray-500"}`}
            onClick={() => setOpen(!open)}
          >
            <p className="text-md px-1">{selected ? selected : placeholder} </p>
            <Image className="w-4 h-4" src={downArrow} alt="downArrow" />
          </div>

          <ul
            className={`bg-gray-200 mt-2 overflow-y-auto 
          ${open ? "max-h-60" : "max-h-0"}`}
          >
            <div className=" flex items-center sticky top-0">
              <Image
                src={search}
                alt="search"
                className="absolute right-2 top-3 w-5 h-5"
              />
              <input
                type={type}
                ref={ref}
                value={inputValue}
                name={name}
                onChange={handleSearch}
                placeholder="انتخاب "
                className=" w-full py-2 px-9 bg-gray-50 outline-none"
              />
            </div>

            {data &&
              data.map((item) => (
                <li
                  key={item?.id}
                  className={`py-2 px-4 text-sm hover:bg-sky-600 hover:text-white
                ${
                  item?.name + item?.last_name === selected
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }
                ${
                  (item?.name || item?.last_name)?.startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                  onClick={() => {
                    if (item?.name + item?.last_name !== selected) {
                      setSelected(
                        (item?.name ? item?.name : "") +
                          (item?.name ? " " + item?.last_name : item?.last_name)
                      );
                      if (getValue) {
                        getValue(item?.id);
                      }

                      // Add this check to avoid invoking `undefined`
                      if (getRealValue) {
                        getRealValue(
                          (item?.name ? item?.name : "") +
                            (item?.name
                              ? " " + item?.last_name
                              : item?.last_name)
                        );
                      }

                      setOpen(false);
                      setInputValue("");
                    }
                  }}
                >
                  {(item?.name ? item?.name : "") +
                    (item?.name ? " " + item?.last_name : item?.last_name)}
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
);

export default SelectByName;
