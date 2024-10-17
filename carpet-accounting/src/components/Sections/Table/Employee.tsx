import searchLogo from "@/assets/table/search.svg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks/useDebounce";
import SelectableInput from "@/components/UI/Inputs/SelectableInput";
import useGetSkills from "@/api/Employees/getSkills";
import useGetAllEmployees from "@/api/Employees/getAllEmployees";
import useGetCheleh from "@/api/Employees/getCheleh";
import useGetGereh from "@/api/Employees/getGereh";
import useGetShirazeh from "@/api/Employees/getShirazeh";
import edit from "@/assets/table/edit.svg"
import view from "@/assets/table/view.svg";


// const skillArray = [
//   { value: "شیرازه", id: 1 },
//   { value: "گره", id: 2 },
//   { value: "چله", id: 3 },
// ]

type Carpet = {
  id: number;
  name: string;
  section: string;
  last_name: string;
};
type actions = {
  row: object;
};
const columnHelper = createColumnHelper<Carpet>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">شماره</span>,
  }),

  columnHelper.accessor("name", {
    cell: (info) => {
      const name = info.getValue();
      return name ? name : "";
    },
    header: () => <span className="flex items-center justify-center">نام</span>,
  }),
  columnHelper.accessor("last_name", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex items-center justify-center">نام خانوادگی</span>,
  }),

  columnHelper.accessor("section", {
    cell: (info) => {
      const section = info.getValue();
      if (section == "1") return "گره زن";
      else if (section == "2") return "چله کش";
      else if (section == "3") return "شیرازه";
      else return section;
    },
    header: () => <span className="flex items-center justify-center">مهارت</span>,
  }),
  {
    id: "actions",
    header: "درخواست‌ها",
    cell: ({ row }: actions) => <Actions row={row} />,
  },

  // columnHelper.accessor("amaliat", {
  //   cell: (info) => info.getValue(),
  //   header: () => (
  //     <span className="flex items-center">
  //       عملیات
  //     </span>
  //   )
  // })
];

function Employees() {
  const { data: AllEmployees } = useGetAllEmployees();
  console.log(AllEmployees);
  
  const { data: Cheleh } = useGetCheleh();
  const { data: Gereh } = useGetGereh();
  const { data: Shirazeh } = useGetShirazeh();
  // console.log(Shirazeh);
  

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const debounceSearch = useDebounce(globalFilter, 1000);
  const { data: Skills } = useGetSkills();



  useEffect(() => {
    if (AllEmployees && AllEmployees.data) {
      setData(AllEmployees.data); // Set data once AllEmployees is available
    }
  }, [AllEmployees]);
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
  
  const handleChangeData = (value: number) => {
    let selectedData = [];
  
    if (value === 1 && Gereh?.data) {
      selectedData = Gereh.data;
    } else if (value === 2 && Cheleh?.data) {
      selectedData = Cheleh.data;
    } else if (value === 3 && Shirazeh?.data) {
      selectedData = Shirazeh.data;
    } else if (AllEmployees?.data) {
      selectedData = AllEmployees.data;
    }
  
    setData(selectedData || []); // Ensure it's never undefined
  };
  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen w-full px-4">
          <div className=" w-calc50 xl:w-calc332 flex flex-col items-stretch py-3 top-0 left-0 bg-white self-center">
            <h1 className="text-2xl sm:text-3xl font-bold self-center mb-6">
              فهرست تمام کارمندان
            </h1>

            <div className="flex flex-col gap-5 sm:flex-row justify-between items-center">
              <div className=" relative ml-4">
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

              <div className="flex items-center gap-4 z-50">
                <div className="flex items-center gap-4">
                  <SelectableInput
                    name="skill"
                    placeholder="انتخاب مهارت"
                    data={Skills?.data}
                    className="z-20 relative"
                    getValue={handleChangeData}
                  />
                </div>
                <button className="py-2 px-4 text-center text-white font-semibold rounded-md bg-[#050A30]">
                  مشاهده
                </button>
              </div>
            </div>
          </div>

          <div className="w-calc50 xl:w-calc332 overflow-x-auto self-center">
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
                {table?.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
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

          <div className="w-calc50 xl:w-calc332 flex flex-col gap-5 sm:flex-row justify-between items-center py-2 text-sm text-gray-700 bottom-2 left-0 self-center">
            <div className="flex items-center mt-4">
              <span className="ml-2">تعداد ردیف ها</span>

              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 p-2"
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
}
interface OriginalType {
  id: number;
  name: string;
  // Add other properties as needed
}

interface Row {
  original?: OriginalType;
}
interface ActionsProps {
  row: Row;
}


//TODO add router ==============================================
const Actions = ({ row }: ActionsProps) => {
  const router = useRouter();
  // const id = router.query.id as string;
  // console.log(id);
  return (
    <div className="flex items-center gap-x-6 justify-center">
      <Image
        className="text-gray-700 w-5 h-5 cursor-pointer duration-200 hover:scale-[1.2]"
        src={edit}
        alt="view"
        onClick={() => { if (row.original)router.push(`/employees/edit/${row.original.id}`)}}
      />
      <Image className="text-gray-700 w-5 h-5 cursor-pointer duration-200 hover:scale-[1.2]"
        src={view}
        alt="view"
        onClick={() => {if(row.original)router.push(`/employees/${row.original.id}`)}}
      />
    </div>
  )
};
// router.push(`/employees/edit/${row.original.id}`)
export default Employees;
