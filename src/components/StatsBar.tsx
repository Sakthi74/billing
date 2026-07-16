import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
// import { Badge } from "./ui/badge";
// import { Search } from "lucide-react";

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
    value: "7",
    description: "Invoices that are paid",
  },
  {
    title: "Remaining invoices",
    value: "4",
    description: "Invoices that are yet to be paid",
  },
];

const StatsBar = () => {
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
      <div className="w-full md:max-w-md lg:w-screen">
        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
        <Input
          placeholder="Search customer, invoice..."
          className="pl-10 h-11 border-2 w-full "
        />

        {/* <Badge
          variant="secondary"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          ⌘K
        </Badge> */}
      </div>
    </div>
  );
};

export default StatsBar;
