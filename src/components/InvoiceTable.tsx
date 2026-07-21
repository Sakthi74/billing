import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useInvoiceStore } from "@/components/Store/InvoiceStore";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export interface Invoice {
  id: number;
  customerName: string;
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  status: string;
}

const columnHelper = createColumnHelper<Invoice>();
//reading column data
const InvoiceTable = () => {
  const columns = [
    columnHelper.accessor("id", {
      header: "Invoice Id",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customerName", {
      header: "Customer Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("items", {
      id: "description",

      header: "Item",
      cell: (info) => (
        <div>
          {info.getValue().map((item, index) => (
            <p key={index}>{item.description}</p>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("items", {
      header: "qty",
      id: "quantity",

      cell: (info) => (
        <div>
          {info.getValue().map((item, index) => (
            <p key={index}>{item.quantity}</p>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("invoiceDate", {
      header: "Invoice Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      header: "Delete",
      cell: (info) => (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            handleDelete(info.row.original.id);
          }}
          className="cursor-pointer "
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-blue-500" />
        </button>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Payment Status",
      cell: (info) => {
        const status = info.getValue();

        return (
          <div
            className={`rounded-md w-16 p-1 flex justify-center items-center text-xs font-medium ${
              status.toLowerCase() === "paid"
                ? "bg-[#d4f4e5] text-[#035439]"
                : "bg-[#fde8e8] text-[#9b1c1c]"
            }`}
          >
            {status}
          </div>
        );
      },
    }),
  ];
  // throw new Error("Testing Error Boundary");
  const [invoices, setInvoices] = useState<Invoice[]>(() =>
    JSON.parse(localStorage.getItem("invoice") || "[]"),
  );
  const navigate = useNavigate();
  const { setSelectedInvoice } = useInvoiceStore();
  //delete function
  function handleDelete(id: number) {
    const deleteData = invoices.filter((item) => {
      return item.id != id;
    });
    setInvoices(deleteData);
    localStorage.setItem("invoice", JSON.stringify(deleteData));
  }
  //defining table
  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-[#f1f5f9]">
      <h2 className="text-xl font-bold text-gray-800 p-1">All Invoices</h2>
      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="lg:w-full md:w-full sm:w-11/12    border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-300 p-3 text-left bg-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
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
                onClick={() => {
                  setSelectedInvoice(row.original);
                  navigate(`/invoice/${row.original.id}`);
                }}
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
      </div>
    </div>
  );
};

export default InvoiceTable;
