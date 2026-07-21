import { create } from "zustand";
import type { Invoice } from "@/components/InvoiceTable";

interface InvoiceStore {
  selectedInvoice: Invoice | null;
  invoices: Invoice[];

  setSelectedInvoice: (invoice: Invoice) => void;
  setInvoices: (invoices: Invoice[]) => void;
  clearInvoice: () => void;
}
//custom hook //create creates a store //set updates values
export const useInvoiceStore = create<InvoiceStore>((set) => ({
  //({ makes our state global

  selectedInvoice: null, //initial state

  invoices: [],
  setSelectedInvoice: (invoice) =>
    set({
      selectedInvoice: invoice,
    }),

  setInvoices: (invoices) =>
    set({
      invoices,
    }),

  clearInvoice: () =>
    set({
      selectedInvoice: null,
      invoices: [],
    }),
}));
