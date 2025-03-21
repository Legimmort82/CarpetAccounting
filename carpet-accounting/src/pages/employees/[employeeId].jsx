import React, { useCallback, useEffect } from "react";
import Head from "next/head";
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
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks/useDebounce";
import SelectableInput from "@/components/UI/Inputs/SelectableInput";
// import { CarpetData } from "@/data/05data";
import useGetSingleEmployee from "@/api/Employees/getSingleEmployee";
import Image from "next/image";
import TestData from "@/data/dataTest.json";
import { apiClient } from "@/api/instance";

const monthArray = [
  { value: "1", id: 1 },
  { value: "2", id: 2 },
  { value: "3", id: 3 },
  { value: "4", id: 4 },
  { value: "5", id: 5 },
  { value: "6", id: 6 },
  { value: "7", id: 7 },
  { value: "8", id: 8 },
  { value: "9", id: 9 },
  { value: "10", id: 10 },
  { value: "11", id: 11 },
  { value: "12", id: 12 },
];

const yearsArray = [
  { value: "1403", id: 8 },
  { value: "1404", id: 9 },
  { value: "1405", id: 10 },
  { value: "1406", id: 11 },
  { value: "1407", id: 12 },
  { value: "1408", id: 13 },
  { value: "1409", id: 14 },
  { value: "1410", id: 15 },
];
// type CarpetKey = 'gereh' | 'cheleh' | 'shirazeh';
// type Carpet = {
//   id: number;
//   isRectangle: boolean;
//   arz: string;
//   tool: string;
//   metraj: string;
//   naghsheh: string;
//   rang: string;
//   serial: string;
//   code: string;
//   shirazeh: string;
//   shirazehKhoroug: string;
//   shirazehVouroud: string;
//   cheleh: string;
//   chelehKhroug: string;
//   chelehVouroud: string;
//   gereh: string;
//   gerehKhoroug: string;
//   gerehVouroud: string;
//   ersalshodeh: boolean;
// };
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">شماره</span>
    ),
  }),

  columnHelper.accessor("arz", {
    id: "arz",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">عرض</span>,
  }),

  columnHelper.accessor("tool", {
    id: "tool",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">طول</span>,
  }),

  columnHelper.accessor("metraj", {
    id: "metraj",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">متراژ</span>
    ),
  }),

  columnHelper.accessor("naghsheh", {
    id: "naghsheh",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">نقشه</span>
    ),
  }),

  columnHelper.accessor("rang", {
    id: "rang",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">رنگ</span>,
  }),

  columnHelper.accessor("serial", {
    id: "serial",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">سریال</span>
    ),
  }),

  columnHelper.accessor("code", {
    id: "code",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">کد</span>,
  }),
  columnHelper.accessor("isRectangle", {
    id: "isRectangle",
    cell: (info) => {
      const rectangle = info.getValue();
      if (rectangle) return "مستطیل";
      else return "دایره";
    },
    header: () => <span className="flex items-center justify-center">نوع</span>,
  }),

  columnHelper.accessor("shirazeh", {
    id: "shirazeh",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">شیرازه</span>
    ),
  }),

  columnHelper.accessor("shirazehKhoroug", {
    id: "shirazehKhoroug",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-شیرازه</span>
    ),
  }),

  columnHelper.accessor("shirazehVouroud", {
    id: "shirazehVouroud",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-شیرازه</span>
    ),
  }),

  columnHelper.accessor("cheleh", {
    id: "cheleh",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">چله</span>,
  }),

  columnHelper.accessor("chelehKhroug", {
    id: "chelehKhroug",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-چله</span>
    ),
  }),

  columnHelper.accessor("chelehVouroud", {
    id: "chelehVouroud",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-چله</span>
    ),
  }),

  columnHelper.accessor("gereh", {
    id: "gereh",
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">گره</span>,
  }),

  columnHelper.accessor("gerehKhoroug", {
    id: "gerehKhoroug",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">خ-گره</span>
    ),
  }),

  columnHelper.accessor("gerehVouroud", {
    id: "gerehVouroud",
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center justify-center">و-گره</span>
    ),
  }),

  columnHelper.accessor("ersalshodeh", {
    id: "ersalshodeh",
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
  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (!accessToken) {
      router.push("/auth/login"); // no token, redirect to login
      return;
    }

    // Verify the token with the API
    apiClient
      .get("/accounts/token-verify", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // Token is valid
        console.log(res);
      })
      .catch(() => {
        // Token is invalid or expired
        localStorage.removeItem("accessToken"); // remove invalid token
        router.push("/auth/login");
      });
  }, [router]);
  const filterColumns = (section) => {
    if (section === "gereh") {
      // Remove columns you don't want in 'gereh' section
      return columns.filter(
        (column) =>
          column.id !== "cheleh" &&
          column.id !== "chelehKhroug" &&
          column.id !== "chelehVouroud" &&
          column.id !== "shirazeh" &&
          column.id !== "shirazehVouroud" &&
          column.id !== "shirazehKhoroug" &&
          column.id !== "rang" &&
          column.id !== "naghsheh" &&
          column.id !== "ersalshodeh" &&
          column.id !== "id"
      );
    } else if (section === "cheleh") {
      // Remove columns you don't want in 'cheleh' section
      return columns.filter(
        (column) =>
          column.id !== "gereh" &&
          column.id !== "gerehKhoroug" &&
          column.id !== "gerehVouroud" &&
          column.id !== "shirazeh" &&
          column.id !== "shirazehVouroud" &&
          column.id !== "shirazehKhoroug" &&
          column.id !== "rang" &&
          column.id !== "naghsheh" &&
          column.id !== "ersalshodeh" &&
          column.id !== "id"
      );
    } else if (section === "shirazeh") {
      // Remove columns for 'shirazeh' section
      return columns.filter(
        (column) =>
          column.id !== "cheleh" &&
          column.id !== "chelehKhroug" &&
          column.id !== "chelehVouroud" &&
          column.id !== "gereh" &&
          column.id !== "gerehKhoroug" &&
          column.id !== "gerehVouroud" &&
          column.id !== "rang" &&
          column.id !== "naghsheh" &&
          column.id !== "ersalshodeh" &&
          column.id !== "id"
      );
    }
    return columns; // Return all columns for other sections
  };
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [fullName, setFullName] = useState("");
  const [section, setSection] = useState("");

  const { data: singleEmployee } = useGetSingleEmployee(
    router.query.employeeId
  );

  const calculateName = useCallback(() => {
    const name = singleEmployee?.data?.name;
    const last_name = singleEmployee?.data?.last_name;
    const section = singleEmployee?.data?.section;
    if (section == "گره زن") setSection("gereh");
    else if (section == "چله کشی") setSection("cheleh");
    else setSection("shirazeh");
    if (name != null || undefined) setFullName(name + " " + last_name);
    else setFullName(last_name);
  }, [singleEmployee]);

  let sumArz = 0;
  let sumTool = 0;
  let sumMetraj = 0;

  useEffect(() => {
    const filteredData = TestData.filter((item) => {
      return item[section] == fullName;
    });
    setData(filteredData);
  }, [section, fullName]);

  const [data, setData] = useState([]);
  const filteredData = data.filter((item) => {
    if (!item.shirazehVouroud || !item[`${section}Vouroud`]) return false;
    else {
      const [itemYear, itemMonth] = item[`${section}Vouroud`]
        .split("/")
        .map(Number); // Rename local variables
      return itemYear === Number(year) && itemMonth === Number(month);
    } // Use state variables
  });
  const handleDate = () => {
    setData(filteredData);
  };
  const [globalFilter, setGlobalFilter] = useState("");
  const debounceSearch = useDebounce(globalFilter, 1000);

  data.filter((item) => {
    let arz = Number(item?.arz);
    let tool = Number(item?.tool);
    let metraj = Number(item?.metraj);
    sumArz = sumArz + arz;
    sumTool = sumTool + tool;
    sumMetraj = sumMetraj + metraj;
  });

  useEffect(() => {
    if (singleEmployee?.data) calculateName();
  }, [singleEmployee?.data, calculateName]);

  const table = useReactTable({
    data,
    columns: filterColumns(section),
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

  const printHandler = () => {
    return window.print();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Carpet Accounting</title>
        </Head>
        <div className="flex flex-col min-h-screen w-full px-4">
          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 flex flex-col items-stretch py-3 fixed top-0 bg-white self-center">
            <h1
              id="name"
              className="text-2xl sm:text-3xl font-bold self-center mb-6"
            >
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
                    getRealValue={(value) => setMonth(value)}
                    className="z-20 relative"
                  />

                  <SelectableInput
                    name="year"
                    placeholder="انتخاب سال"
                    data={yearsArray}
                    getRealValue={(value) => setYear(value)}
                    className="z-50 relative"
                  />
                </div>
                <button
                  onClick={handleDate}
                  className="py-2 px-4 text-center text-white font-semibold rounded-md bg-[#050A30] hover:shadow-md hover:shadow-gray-500 duration-300"
                >
                  مشاهده
                </button>
              </div>
            </div>
          </div>
          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 overflow-x-auto self-center mt-[200px] mb-[200px] md:mt-[140px] md:mb-[100px]">
            <table
              id="table"
              className=" divide-y divide-white rounded-lg w-full border border-collapse"
            >
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
          <div className="w-calc50 xl:w-calc132 2xl:w-calc232 bg-white flex flex-col gap-5 sm:flex-row justify-between items-center py-2 text-sm text-gray-700 fixed bottom-0 self-center">
            <div className="flex gap-6 justify-center  mt-4">
              <div>مجموع عرض</div>
              {sumArz}
              <div>مجموع طول</div>
              {sumTool}
              <div>مجموع متراژ</div>
              {sumMetraj}
            </div>
            <div className="flex items-center mt-4 ">
              <span className="ml-4">تعداد ردیف ها</span>

              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 35, 60, 100, 200, 300, 500, 800].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={printHandler}
                className="bg-gray-300 text-gray-700 font-bold p-2 rounded-md py-3 px-6 duration-200 hover:bg-gray-400"
              >
                چاپ جدول
              </button>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
              <button
                className="p-2 ml-1 rounded-md bg-[#050A30] text-white hover:bg-gray-200 hover:text-black duration-100 disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>

              <button
                className="p-2 rounded-md ml-2 bg-[#050A30] text-white hover:bg-gray-200 hover:text-black duration-100 disabled:opacity-50"
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
                className="p-2 ml-1 rounded-md bg-[#050A30] text-white hover:bg-gray-200 hover:text-black duration-100 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>

              <button
                className="p-2 rounded-md bg-[#050A30] text-white hover:bg-gray-200 hover:text-black duration-100 disabled:opacity-50"
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
