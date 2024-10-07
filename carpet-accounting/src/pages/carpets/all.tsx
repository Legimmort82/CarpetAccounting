import searchLogo from "@/assets/table/search.svg"
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";
import mockData from "@/data/data.json"
import Image from "next/image";
import Layout from "@/components/Layout/Layout";


type Carpet = {
  shomareh: number,
  arz: string,
  tool: string,
  metraj: string,
  naghsheh: string,
  rang: string,
  serial: string,
  code: string,
  shirazeh: string,
  shirazehKhoroug: string,
  shirazehVouroud: string,
  cheleh: string,
  chelehKhroug: string,
  chelehVouroud: string,
  gereh: string,
  gerehKhoroug: string,
  gerehVouroud: string,
  ersalshodeh: boolean
}
const columnHelper = createColumnHelper < Carpet > ();

const columns = [
  columnHelper.accessor("shomareh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        شماره
      </span>
    )
  }),

  columnHelper.accessor("arz", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        عرض
      </span>
    )
  }),

  columnHelper.accessor("tool", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        طول
      </span>
    )
  }),

  columnHelper.accessor("metraj", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        متراژ
      </span>
    )
  }),

  columnHelper.accessor("naghsheh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        نقشه
      </span>
    )
  }),

  columnHelper.accessor("rang", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        رنگ
      </span>
    )
  }),

  columnHelper.accessor("serial", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        سریال
      </span>
    )
  }),

  columnHelper.accessor("code", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        کد
      </span>
    )
  }),

  columnHelper.accessor("shirazeh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        شیرازه
      </span>
    )
  }),

  columnHelper.accessor("shirazehKhoroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        خ-شیرازه
      </span>
    )
  }),

  columnHelper.accessor("shirazehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        و-شیرازه
      </span>
    )
  }),

  columnHelper.accessor("cheleh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        چله
      </span>
    )
  }),

  columnHelper.accessor("chelehKhroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        خ-چله
      </span>
    )
  }),

  columnHelper.accessor("chelehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        و-چله
      </span>
    )
  }),

  columnHelper.accessor("gereh", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        گره
      </span>
    )
  }),

  columnHelper.accessor("gerehKhoroug", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        خ-گره
      </span>
    )
  }),

  columnHelper.accessor("gerehVouroud", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        و-گره
      </span>
    )
  }),

  columnHelper.accessor("ersalshodeh", {
    cell: (info) => <span>{info.getValue() ? "بله" : "خیر"}</span>,
    header: () => (
      <span className="flex items-center">
        ارسال شده
      </span>
    )
  }),
]

function AllCarpets() {
  const [data, setData] = useState([...mockData])
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
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
        <div className="flex flex-col min-h-screen w-full py-6 px-4 items-center overflow-auto">

          <h1 className="text-3xl font-bold mb-5">فهرست تمام قالی ها</h1>

          <div className="flex justify-between items-center w-full">
            <div className="mb-4 relative">
              <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="دنبال چی میگردی؟"
                className="relative bg-[#2E2A54] h-[44px] pl-4 pr-9 py-3 rounded-md w-[550px] text-white"
              />
              <Image className="absolute w-7 h-7 top-[10px] right-1" src={searchLogo} alt="search-logo" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-300 h-[44px] text-center rounded-md w-[200px]">
                  ماه
                </div>
                <div className="bg-gray-300 h-[44px] text-center rounded-md w-[200px]">
                  سال
                </div>
              </div>

              <button className="bg-gray-200 py-2 px-4 text-center rounded-md">مشاهده</button>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-white">
              <thead className="bg-[#050A30]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-9 py-3 text-center text-xs font-medium text-white uppercase"
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

              <tbody className="bg-[#C9CCE7] divide-y-2 divide-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-9 py-4 text-center text-sm font-medium text-gray-800"
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

          <div className="flex justify-between items-center mt-4 text-sm text-gray-700 w-full">
            <div className="flex items-center mt-4 ">
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

export default AllCarpets


