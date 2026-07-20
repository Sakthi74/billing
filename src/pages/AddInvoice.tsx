import Navbar from "@/components/Navbar";
import InvoiceForm from "@/forms/InvoiceForm";

const AddInvoice = () => {
  return (
    <div className="min-h-screen felx ">
      <Navbar />

      <div className="flex justify-center  lg:ml-[660px]">
        <InvoiceForm />
      </div>
    </div>
  );
};
export default AddInvoice;
