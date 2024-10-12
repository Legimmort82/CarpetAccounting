import searchLogo from "@/assets/table/search.svg"
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";
import employeesData from "@/data/employees.json"
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks/useDebounce";
import SelectableInput from "@/components/UI/Inputs/SelectableInput";
import useGetSkills from "@/api/Carpets/Skills/getSkills";

// const skillArray = [
//   { value: "شیرازه", id: 1 },
//   { value: "گره", id: 2 },
//   { value: "چله", id: 3 },
// ]

type Carpet = {
  shomareh: number,
  name: string,
  maharat: string
}
const columnHelper = createColumnHelper<Carpet>();

const columns = [
  columnHelper.accessor("shomareh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        شماره
      </span>
    )
  }),

  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        نام و نام خانوادگی
      </span>
    )
  }),

  columnHelper.accessor("maharat", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        مهارت
      </span>
    )
  }),

  // columnHelper.accessor("amaliat", {
  //   cell: (info) => info.getValue(),
  //   header: () => (
  //     <span className="flex items-center">
  //       عملیات
  //     </span>
  //   )
  // })
]

function Employees() {
  const [data, setData] = useState([...employeesData])
  const [globalFilter, setGlobalFilter] = useState("");
  const debounceSearch = useDebounce(globalFilter, 1000);
  const router = useRouter()
  const { data: Skills } = useGetSkills()

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
        <div className="flex flex-col h-screen w-full pt-[150px] px-4 items-center">
          <div className="flex flex-col items-stretch pl-4 py-3 pr-[366px] fixed top-0 left-0 bg-white w-full">
            <h1 className="text-3xl font-bold self-center mb-6">فهرست تمام کارمندان</h1>

            <div className="flex justify-between items-center">
              <div className="mb-4 relative">
                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="دنبال چی میگردی؟"
                  className="relative bg-[#0c007a] h-[44px] pl-4 pr-9 py-3 rounded-md w-[550px] text-white"
                />
                <Image className="absolute w-7 h-7 top-[10px] right-1" src={searchLogo} alt="search-logo" />
              </div>

              <div className="flex items-center gap-4 mb-4 z-50">
                <div className="flex items-center gap-4">
                  <SelectableInput
                    name="skill"
                    placeholder="انتخاب مهارت"
                    data={Skills?.data}
                    className="z-20 relative"
                  />
                </div>
                <button className="bg-gray-200 py-2 px-4 text-center rounded-md">مشاهده</button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-white">
              <thead className="bg-[#000655]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase"
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

              <tbody className="bg-[#7fb8e7] divide-y-2 divide-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} onClick={() => router.push(`/employees/edit/${row.original.shomareh}`)} className="hover:bg-gray-50 cursor-pointer">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-7 py-4 text-right text-sm font-medium text-gray-800"
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

          <div className="flex justify-between items-center py-2 text-sm text-gray-700 bg-white pl-40 pr-[510px] fixed bottom-0 left-0 w-full">
            <div className="flex items-center mt-4">
              <span className="ml-2">تعداد ردیف ها</span>

              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
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
                className="p-2 ml-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>

              <button
                className="p-2 rounded-md ml-2 bg-gray-200 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
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
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 p-2 rounded-md border border-gray-300 text-center"
                />
                <span className="ml-1"> از {table.getPageCount()} </span>
              </div>

              <button
                className="p-2 ml-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>

              <button
                className="p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
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
  )
}

export default Employees
