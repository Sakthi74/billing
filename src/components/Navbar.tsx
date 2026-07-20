import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { UsersRound, LayoutPanelLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isInvoiceActive =
    location.pathname === "/invoice-page" ||
    location.pathname === "/add-invoice";

  const isCustomerActive =
    location.pathname === "/customer-page" ||
    location.pathname === "/add-customer";

  const activeClass =
    "cursor-pointer px-4 py-5 bg-black text-white border border-gray-400 hover:bg-black";
  const inactiveClass =
    "cursor-pointer px-4 py-5 text-black border border-gray-400 hover:bg-gray-100";

  return (
    <div className="p-4 sm:p-6 bg-[#f1f5f9]">
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 rounded-lg bg-white p-4 sm:h-18 sm:py-0 shadow-sm">
        {/* left side */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            BILLING
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 tracking-wide">
            ENTERPRISE EDITION
          </p>
        </div>

        {/* right side */}
        <ButtonGroup className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button
            variant="secondary"
            className={isInvoiceActive ? activeClass : inactiveClass}
            onClick={() => navigate("/invoice-page")}
          >
            <LayoutPanelLeft className="size-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">Invoices</span>
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant="secondary"
            className={isCustomerActive ? activeClass : inactiveClass}
            onClick={() => navigate("/customer-page")}
          >
            <UsersRound className="size-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">Customers</span>
          </Button>
        </ButtonGroup>
      </nav>
    </div>
  );
};

export default Navbar;
