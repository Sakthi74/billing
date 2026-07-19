import {useState} from 'react'
import { createColumnHelper,getCoreRowModel,useReactTable,flexRender } from '@tanstack/react-table'

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export interface Invoice {
  id: number;
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
}


const columnHelper=createColumnHelper<Invoice>();

const columns=[columnHelper.accessor("id",{
  header:"Invoice Id",
  cell:(info)=>info.getValue()
}),
columnHelper.accessor("customerId",{header:"Customer Id",cell:(info)=>info.getValue()})]
const InvoiceTable = () => {
  const[invoices]=useState<Invoice[]>(()=>JSON.parse(localStorage.getItem("invoice")||"[]"))
 
const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
   
    } )   
  return (
    <div className="p-6 bg-[#f1f5f9]">
        
           <h2 className="text-xl font-bold text-gray-800">All Invoices</h2>
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
            header.getContext()
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
        </div>
      
    </div>
  )
}

export default InvoiceTable
