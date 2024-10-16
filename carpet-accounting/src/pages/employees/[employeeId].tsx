import React, { useEffect } from "react";
import searchLogo from "@/assets/table/search.svg";
import check from "@/assets/table/check.svg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import mockData from "@/data/data.json";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks/useDebounce";
import SelectableInput from "@/components/UI/Inputs/SelectableInput";
import { CarpetData } from "@/data/05data";
import useGetSingleEmployee from "@/api/Employees/getSingleEmployee";
const monthArray = [
  { value: "01", id: 1 },
  { value: "02", id: 2 },
  { value: "03", id: 3 },
  { value: "04", id: 4 },
  { value: "05", id: 5 },
  { value: "06", id: 6 },
  { value: "07", id: 7 },
  { value: "08", id: 8 },
  { value: "09", id: 9 },
  { value: "10", id: 10 },
  { value: "11", id: 11 },
  { value: "12", id: 12 },
];
const yearsArray = [
  { value: "1396", id: 1 },
  { value: "1397", id: 2 },
  { value: "1398", id: 3 },
  { value: "1399", id: 4 },
  { value: "1400", id: 5 },
  { value: "1401", id: 6 },
  { value: "1402", id: 7 },
  { value: "1403", id: 8 },
  { value: "1404", id: 9 },
  { value: "1405", id: 10 },
  { value: "1406", id: 11 },
  { value: "1407", id: 12 },
];

type Carpet = {
  id: number;
  isRectangle: boolean;
  arz: string;
  tool: string;
  metraj: string;
  naghsheh: string;
  rang: string;
  serial: string;
  code: string;
  shirazeh: string;
  shirazehKhoroug: string;
  shirazehVouroud: string;
  cheleh: string;
  chelehKhroug: string;
  chelehVouroud: string;
  gereh: string;
  gerehKhoroug: string;
  gerehVouroud: string;
  ersalshodeh: boolean;
};
const columnHelper = createColumnHelper<Carpet>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">شماره</span>
    ),
  }),

  columnHelper.accessor("arz", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">عرض</span>,
  }),

  columnHelper.accessor("tool", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">طول</span>,
  }),

  columnHelper.accessor("metraj", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">متراژ</span>
    ),
  }),

  columnHelper.accessor("naghsheh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">نقشه</span>
    ),
  }),

  columnHelper.accessor("rang", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">رنگ</span>,
  }),

  columnHelper.accessor("serial", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">سریال</span>
    ),
  }),

  columnHelper.accessor("code", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">کد</span>,
  }),
  columnHelper.accessor("isRectangle", {
    cell: (info) => {
      const rectangle = info.getValue();
      if (rectangle) return "مستطیل";
      else return "دایره";
    },
    header: () => <span className="flex items-center justify-center">نوع</span>,
  }),

  columnHelper.accessor("shirazeh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">شیرازه</span>
    ),
  }),

  columnHelper.accessor("shirazehKhoroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-شیرازه</span>
    ),
  }),

  columnHelper.accessor("shirazehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-شیرازه</span>
    ),
  }),

  columnHelper.accessor("cheleh", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">چله</span>,
  }),

  columnHelper.accessor("chelehKhroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-چله</span>
    ),
  }),

  columnHelper.accessor("chelehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-چله</span>
    ),
  }),

  columnHelper.accessor("gereh", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">گره</span>,
  }),

  columnHelper.accessor("gerehKhoroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-گره</span>
    ),
  }),

  columnHelper.accessor("gerehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-گره</span>
    ),
  }),

  columnHelper.accessor("ersalshodeh", {
    cell: ({ row: { original } }) =>
      original.ersalshodeh ? (
        <Image className="w-7 h-7" src={check} alt="check" />
      ) : (
        <span className="text-[16px] duration-200 hover:text-[22px]">خیر</span>
      ),
    header: () => (
      <span className="flex items-center justify-center">ارسال شده</span>
    ),
  }),
];
const EmployeePage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [section, setSection] = useState("");

  const { data: singleEmployee } = useGetSingleEmployee(
    router.query.employeeId
  );
  
  const calculateName = () => {
    const name = singleEmployee?.data?.name;
    const last_name = singleEmployee?.data?.last_name;
    const section = singleEmployee?.data?.section;
    if (section == 1) setSection("gereh");
    else if (section == 2) setSection("cheleh");
    else setSection("shirazeh");
    if (name != null || undefined) setFullName(name + " " + last_name);
    else setFullName(last_name);
  };

  const filteredData = CarpetData.filter((item) => item[section] == fullName);
  
  useEffect(()=>{
  if(filteredData){
    setData(filteredData)
  }

  },[singleEmployee,fullName])
  const [data, setData] = useState(filteredData);
  const [globalFilter, setGlobalFilter] = useState("");
  const debounceSearch = useDebounce(globalFilter, 1000);

  useEffect(() => {
    if (singleEmployee?.data) calculateName();
  }, [singleEmployee?.data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: debounceSearch,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen w-full px-4">
          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 flex flex-col items-stretch py-3 top-0 left-0 bg-white self-center">
            <h1 className="text-2xl sm:text-3xl font-bold self-center mb-6">
              {singleEmployee?.data && (
                <div>
                  {singleEmployee?.data?.name
                    ? singleEmployee?.data?.name +
                      " " +
                      singleEmployee?.data?.last_name
                    : singleEmployee?.data?.last_name}
                </div>
              )}
            </h1>

            <div className="flex flex-col gap-5 sm:flex-row justify-between items-center">
              <div className="relative ml-4">
                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="دنبال چی میگردی؟"
                  className="relative bg-[#050A30] flex items-center h-[44px] pl-4 pr-11 py-3 font-semibold rounded-md min-w-[250px] text-white"
                />
                <Image
                  className="absolute w-7 h-7 top-[9px] right-2"
                  src={searchLogo}
                  alt="search-logo"
                />
              </div>

              <div className="flex mb-5 md:mb-0 items-center gap-4 z-50">
                <div className="flex items-center gap-4">
                  <SelectableInput
                    name="month"
                    placeholder="انتخاب ماه"
                    data={monthArray}
                    className="z-20 relative"
                  />

                  <SelectableInput
                    name="year"
                    placeholder="انتخاب سال"
                    data={yearsArray}
                    className="z-50 relative"
                  />
                </div>
                <button className="py-2 px-4 text-center text-white font-semibold rounded-md bg-[#050A30]">
                  مشاهده
                </button>
              </div>
            </div>
          </div>

          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 overflow-x-auto self-center">
            <table className=" divide-y divide-white overflow-x-auto rounded-lg w-full border border-collapse">
              <thead className="bg-[#050A30] top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-9 py-3 text-center text-md font-medium text-white uppercase border"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="bg-[#c3c4cb] divide-y-2 divide-white">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() =>
                      router.push(`/carpets/edit/${row.original.id}`)
                    }
                    className="cursor-pointer even:bg-[#dfdfe7]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-9 py-4 text-center text-sm font-medium text-gray-800 border"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 flex flex-col gap-5 sm:flex-row justify-between items-center py-2 text-sm text-gray-700 bottom-2 left-0 self-center">
            <div className="flex items-center mt-4 ">
              <span className="ml-4">تعداد ردیف ها</span>

              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 35, 60, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
              <button
                className="p-2 ml-1 rounded-md bg-[#050A30] text-white hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>

              <button
                className="p-2 rounded-md ml-2 bg-[#050A30] text-white hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>

              <div className="flex items-center ml-2">
                <input
                  min={1}
                  max={table.getPageCount()}
                  type="number"
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 p-2 rounded-md border border-gray-300 text-center"
                />
                <span className="ml-1 mr-2"> از {table.getPageCount()} </span>
              </div>

              <button
                className="p-2 ml-1 rounded-md bg-[#050A30] text-white hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>

              <button
                className="p-2 rounded-md bg-[#050A30] text-white hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EmployeePage;
