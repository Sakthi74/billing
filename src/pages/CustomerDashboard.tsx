import Customertable from "@/components/Customertable";
import MiddleManage from "@/components/MiddleManage";
import Navbar from "../components/Navbar";
import StatsBar from "@/components/StatsBar";

const CustomerDashboard = () => {
  return (
    <>
      <div>
        <Navbar />
        <MiddleManage />
        <Customertable />
      </div>
    </>
  );
};

export default CustomerDashboard;
