import { useState, useMemo } from "react";
import { MapPin, Search } from "lucide-react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  type SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: string;
}

//readinf colum data
const columnHelper = createColumnHelper<customer>();

const columns = [
  columnHelper.accessor("id", {
    header: "Customer ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fullName", {
    header: "Customer Name",
    cell: (info) => <span className="font-bold">{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: "email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone No",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => `${row.address}, ${row.city}, ${row.state}`, {
    id: "location",
    header: "Location",
    cell: (info) => (
      <span className="flex items-center gap-1">
        <MapPin size={14} className="shrink-0 text-gray-500" />
        {info.getValue()}
      </span>
    ),
  }),
  // columnHelper.accessor("status", {
  //   header: "Status",
  //   cell: (info) => {
  //     const status = info.getValue();
  //     const isPaid = status?.toLowerCase() === "paid";
  //     return (
  //       <div
  //         className={`rounded-md w-16 p-1 flex justify-center items-center text-xs font-medium ${
  //           isPaid
  //             ? "bg-[#d4f4e5] text-[#035439]"
  //             : "bg-[#fde8e8] text-[#9b1c1c]"
  //         }`}
  //       >
  //         {status}
  //       </div>
  //     );
  //   },
  // }),
];

const Customertable = () => {
  const [customers] = useState<customer[]>(() =>
    JSON.parse(localStorage.getItem("customers") || "[]"),
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  // filter customers by name/email/phone as the user types
  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return customers;

    const value = search.toLowerCase();

    return customers.filter(
      (c) =>
        c.fullName.toLowerCase().includes(value) ||
        c.email.toLowerCase().includes(value) ||
        String(c.id).includes(value) ||
        c.address.toLowerCase().includes(value) ||
        c.city.toLowerCase().includes(value) ||
        c.state.toLowerCase().includes(value),
    );
  }, [customers, search]);
  //defining table
  const table = useReactTable({
    data: filteredCustomers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },

    //telling table about sort
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-[#f1f5f9]">
      {/* header row: title + search, aligned */}
      <div className="flex flex-col md:flex-row lg:flx-row items-center justify-between mb-4 p-4">
        <h2 className="text-xl font-bold text-gray-800">All Customers</h2>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="pl-9 pr-3 py-2 w-64 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:border-[#ff7622]"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="lg:w-full md:w-full sm:w-11/12    border-collapse">
          <thead>
            {/* getting headers from header group */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((headers) => (
                  <th
                    key={headers.id}
                    // making header to handle sorting
                    onClick={headers.column.getToggleSortingHandler()}
                    className="border-b border-gray-300 p-3 text-left bg-gray-100 cursor-pointer hover:bg-gray-200 "
                  >
                    {flexRender(
                      headers.column.columnDef.header,
                      headers.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white ">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="last:[&>td]:border-b-0 hover:bg-gray-50 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b border-gray-300 p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border px-4 py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-black hover:text-white"
          >
            Previous
          </button>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border px-4 py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-black hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customertable;
