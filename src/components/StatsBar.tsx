import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useInvoiceStore } from "./Store/InvoiceStore";

const StatsBar = () => {
  //using zustand
  // const { invoices } = useInvoiceStore();
  // const paidCount = invoices.filter((item) => {
  //   return item.status.toLowerCase() === "paid";
  // }).length;
  // console.log("Invoices from Zustand:", invoices);
  // console.log(`paidCount : ${paidCount}`);

  //using local storage
  const invoiceDetails = JSON.parse(localStorage.getItem("invoice") || "[]");
  const paidCount = invoiceDetails.filter((item) => {
    return item.status.toLowerCase() === "paid";
  }).length;
  console.log(`paidCount : ${paidCount}`);

  const unPaidCount = invoiceDetails.filter((item) => {
    return item.status.toLowerCase() === "unpaid";
  }).length;
  console.log(`paidCount : ${unPaidCount}`);
  const StatsData = [
    {
      title: "Total Revenue",
      value: "$7774.00",
      description: "Total billed amount",
    },
    {
      title: "Pending Amount",
      value: "$367.00",
      description: "Remaining amount",
    },
    {
      title: "Paid invoices",
      value: paidCount,
      description: "Invoices that are paid",
    },
    {
      title: "Remaining invoices",
      value: unPaidCount,
      description: "Invoices that are yet to be paid",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-screen p-7 bg-[#f1f5f9]">
      {StatsData.map((stat) => (
        <Card key={stat.title} className="w-full h-36">
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{stat.value}</h2>
          </CardContent>

          <CardDescription className="px-6 pb-4">
            {stat.description}
          </CardDescription>
        </Card>
      ))}
    </div>
  );
};

export default StatsBar;
