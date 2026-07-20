import AddCustomer from "./components/AddCustomer";
import AddInvoice from "./pages/AddInvoice";
import CustomerDashboard from "./pages/CustomerDashboard";
import InvoiceDashboard from "./pages/InvoiceDashboard";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoicePreview from "./components/InvoicePreview";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/customer-page" element={<CustomerDashboard />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/invoice-page" element={<InvoiceDashboard />} />
          <Route path="/add-invoice" element={<AddInvoice />} />
          <Route path="/invoice/:id" element={<InvoicePreview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
