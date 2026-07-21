import Customertable from "@/components/Customertable";
import MiddleManage from "@/components/MiddleManage";
import Navbar from "../components/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import FallBack from "@/components/FallBack";

const CustomerDashboard = () => {
  return (
    <>
      <div>
        <Navbar />
        <MiddleManage />
        <ErrorBoundary
          FallbackComponent={FallBack}
          onReset={() => window.location.reload()}
        >
          <Customertable />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default CustomerDashboard;
