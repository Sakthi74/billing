import AddCustomer from "./components/AddCustomer";
import Customertable from "./components/Customertable";
import Navbar from "./components/Navbar";
import AddressDetails from "./forms/AddressDetails";
import InvoiceForm from "./forms/InvoiceForm";
import CustomerDashboard from "./pages/CustomerDashboard";
import InvoiceDashboard from "./pages/InvoiceDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <AddCustomer /> */}
      {/* <Customertable /> */}
      {/* <InvoiceDashboard /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/customer-page" element={<CustomerDashboard />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/invoice-page" element={<InvoiceDashboard />} />
          <Route path="/add-invoice" element={<InvoiceForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
