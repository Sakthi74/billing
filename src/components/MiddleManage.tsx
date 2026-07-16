import ButtonChildren from "./ChildrenButtom";

const MiddleManage = () => {
  return (
    <div className="flex  flex-col  md:flex-row lg:flex-row w-screen justify-between p-12 items-center bg-[#f1f5f9] gap-4">
      <div className="lg:p-6 flex flex-col  justify-center ">
        <h1 className="lg:text-4xl md:text-3xl text-2xl  font-semibold">
          Invoices
        </h1>
        <p className="text-gray-500 text-sm ">
          Manage and track customer billings effortlessly.
        </p>
      </div>

      <ButtonChildren>+ New Invoice</ButtonChildren>
    </div>
  );
};

export default MiddleManage;
