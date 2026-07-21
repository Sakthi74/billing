import ButtonChildren from "./ChildrenButtom";
import { useNavigate, useLocation } from "react-router-dom";

const MiddleManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex  flex-col  md:flex-row lg:flex-row w-screen justify-between lg:p-3 md:p-6 pt-12  items-center bg-[#f1f5f9] gap-4">
      <div className="lg:p-6 p-3 md:p-6  flex flex-col items-center justify-center ">
        <h1 className="lg:text-4xl md:text-3xl text-2xl  font-semibold">
          {location.pathname == "/customer-page" || location.pathname == "/"
            ? "Customer"
            : "Invoices"}
        </h1>
        <p className="text-gray-500 text-sm text-center ">
          {location.pathname == "/customer-page" || location.pathname == "/"
            ? "    Manage and track customer Database and their billing history"
            : "Manage and track customer billings effortlessly."}
        </p>
      </div>

      {location.pathname == "/customer-page" || location.pathname === "/" ? (
        <ButtonChildren onClick={() => navigate("/add-customer")}>
          + Add Customer
        </ButtonChildren>
      ) : (
        <ButtonChildren onClick={() => navigate("/add-invoice")}>
          + New Invoice
        </ButtonChildren>
      )}
    </div>
  );
};

export default MiddleManage;
