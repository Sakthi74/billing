import { create } from "zustand";
import type { Invoice } from "@/components/InvoiceTable";

interface InvoiceStore {
  selectedInvoice: Invoice | null;

  setSelectedInvoice: (invoice: Invoice) => void;

  clearInvoice: () => void;
}
//custom hook //create creates a store //set updates values
export const useInvoiceStore = create<InvoiceStore>((set) => ({
  //({ makes our state global

  selectedInvoice: null, //initial state

  setSelectedInvoice: (invoice) =>
    set({
      selectedInvoice: invoice,
    }),

  clearInvoice: () =>
    set({
      selectedInvoice: null,
    }),
}));
