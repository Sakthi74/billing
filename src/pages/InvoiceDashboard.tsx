import MiddleManage from "@/components/MiddleManage";
import Navbar from "../components/Navbar";
import StatsBar from "@/components/StatsBar";
import InvoiceTable from "@/components/InvoiceTable";
import { ErrorBoundary } from "react-error-boundary";
import FallBack from "@/components/FallBack";
const InvoiceDashboard = () => {
  return (
    <div>
      <Navbar />
      <MiddleManage />
      <StatsBar />

      <ErrorBoundary
        FallbackComponent={FallBack}
        onReset={() => window.location.reload()}
      >
        <InvoiceTable />
      </ErrorBoundary>
    </div>
  );
};

export default InvoiceDashboard;
