import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { useState } from "react";
import { UsersRound, LayoutPanelLeft } from "lucide-react";

const Navbar = () => {
  const [select, setSelect] = useState<string>("Invoices");
  return (
    <>
      <div className="p-12 bg-[#f1f5f9]">
        <nav className="flex  lg:bg-white md:flex-row flex-col lg:flex-row md:justify-between lg:justify-between gap-6   rounded-4xl h-18 lg:items-center">
          {/* left side */}
          <div className="lg:p-6">
            <h1 className="lg:text-3xl md:text-3xl text-2xl  font-semibold">
              BILLING
            </h1>
            <p>ENTERPRISE EDITION</p>
          </div>

          {/* Right */}
          <ButtonGroup className="lg:p-6 ">
            <Button
              variant="secondary"
              className={
                select === "Invoices"
                  ? "cursor-pointer p-5 bg-black text-white hover:bg-black"
                  : "cursor-pointer p-5  text-black"
              }
              onClick={() => setSelect("Invoices")}
            >
              {" "}
              <LayoutPanelLeft />
              Invoices
            </Button>

            <ButtonGroupSeparator />

            <Button
              variant="secondary"
              className={
                select === "Customers"
                  ? "cursor-pointer p-5 bg-black text-white hover:bg-black"
                  : "cursor-pointer p-5  text-black"
              }
              onClick={() => setSelect("Customers")}
            >
              {" "}
              <UsersRound />
              Customers
            </Button>
          </ButtonGroup>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
