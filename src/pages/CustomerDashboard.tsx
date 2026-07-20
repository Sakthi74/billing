import Customertable from "@/components/Customertable";
import MiddleManage from "@/components/MiddleManage";
import Navbar from "../components/Navbar";

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
