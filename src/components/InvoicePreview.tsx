import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInvoiceStore } from "./Store/InvoiceStore";

const InvoicePreview = () => {
  const { id } = useParams();

  const { selectedInvoice, setSelectedInvoice } = useInvoiceStore();

  // Recover after refresh
  useEffect(() => {
    if (selectedInvoice) return;

    const invoices = JSON.parse(localStorage.getItem("invoice") || "[]");

    const invoice = invoices.find((item: any) => item.id === Number(id));

    if (invoice) {
      setSelectedInvoice(invoice);
    }
  }, [id, selectedInvoice, setSelectedInvoice]);

  if (!selectedInvoice) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Invoice Not Found</h1>
      </div>
    );
  }

  const subtotal = selectedInvoice.items.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = selectedInvoice.items.reduce(
    (sum: number, item) => sum + (item.price * item.quantity * item.tax) / 100,
    0,
  );

  const grandTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">INVOICE</h1>

            <p className="text-gray-500">Invoice ID : #{selectedInvoice.id}</p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-gray-700 cursor-pointer text-white px-5 font-bold hover:bg-gray-500 rounded-lg"
          >
            Print
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="font-semibold text-lg">Customer</h2>

            <p>{selectedInvoice.customerName}</p>
            <p>Customer Id : {selectedInvoice.customerId}</p>
          </div>

          <div className="text-right">
            <p>Invoice Date : {selectedInvoice.invoiceDate}</p>

            <p>Due Date : {selectedInvoice.dueDate}</p>
          </div>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100 border-t">
            <tr>
              <th className="border p-3 text-left">Description</th>

              <th className="border p-3">Qty</th>

              <th className="border p-3">Price</th>

              <th className="border p-3">Tax %</th>

              <th className="border p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {selectedInvoice.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-3">{item.description}</td>

                <td className="border p-3 text-center">{item.quantity}</td>

                <td className="border p-3 text-center">${item.price}</td>

                <td className="border p-3 text-center">{item.tax}%</td>

                <td className="border p-3 text-center">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 flex justify-end">
          <div className="w-72">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 text-xl font-bold border-t mt-2 pt-2">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
