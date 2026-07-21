import { lazy, Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AddCustomer = lazy(() => import("./components/AddCustomer"));
const AddInvoice = lazy(() => import("./pages/AddInvoice"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const InvoiceDashboard = lazy(() => import("./pages/InvoiceDashboard"));
const InvoicePreview = lazy(() => import("./components/InvoicePreview"));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="h-10 w-10 border-4 border-gray-300 border-t-[#ff7622] rounded-full animate-spin" />
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/customer-page" element={<CustomerDashboard />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/invoice-page" element={<InvoiceDashboard />} />
            <Route path="/add-invoice" element={<AddInvoice />} />
            <Route path="/invoice/:id" element={<InvoicePreview />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
