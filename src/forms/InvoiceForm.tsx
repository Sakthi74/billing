import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import ButtonChildren from "../components/ChildrenButtom";
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema, type InvoiceFormData } from "../schema/InvoiceSchema";

import { ReceiptText } from "lucide-react";

type InvoiceForm = {
  customerId: string;
  invoiceDate: string;
  dueDate: string;

  items: {
    description: string;
    quantity: number;
    price: number;
    tax: number;
  }[];
};

const InvoiceForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: "",
      invoiceDate: "",
      dueDate: "",
      items: [
        {
          description: "",
          quantity: 1,
          price: 0,
          tax: 10,
        },
      ],
    },
  });

  const onSubmit = (data: InvoiceFormData) => {
    console.log(data);
  };

  const onValidate = async () => {
    const isValid = await trigger(["customerId", "invoiceDate", "dueDate"]);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  return (
    <div className="flex ">
      <Card className="w-full max-w-[700px] lg:w-1/2 p-6 sm:p-12 mt-6">
        <div className="flex border-b border-black p-4 gap-3">
          <ReceiptText />
          <h1 className="font-bold">Create New Invoice</h1>
        </div>

        <Field>
          <FieldLabel htmlFor="input-full-name">
            Customer Name <sup className="text-red-500">*</sup>
          </FieldLabel>
          <select
            id="input-full-name"
            type="date"
            placeholder="Jimmy mcgill"
            className="bg-[#f1f5f9] p-3 rounded-md cursor-pointer"
          >
            {" "}
            <option value="">Choose Customer</option>
            {JSON.parse(localStorage.getItem("customers") || "[]").map(
              (item: any) => (
                <option
                  key={item.id}
                  value={item.id}
                  className="cursor-pointer bg-gray-100"
                >
                  {item.fullName}
                </option>
              ),
            )}
            <p className="text-red-500"></p>
          </select>
        </Field>
        <div className="flex gap-3">
          <Field>
            <FieldLabel htmlFor="input-full-name">
              Invoice Date <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-full-name"
              type="date"
              placeholder="Jimmy mcgill"
              className="bg-[#f1f5f9] p-6"
            />
            <p className="text-red-500"></p>
          </Field>

          <Field>
            <FieldLabel htmlFor="input-full-name">
              Due Date <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-full-name"
              type="date"
              placeholder="Jimmy mcgill"
              className="bg-[#f1f5f9] p-6"
            />
            <p className="text-red-500"></p>
          </Field>
        </div>

        <Card>
          <button
            type="button"
            onClick={() =>
              append({
                description: "",
                quantity: 1,
                price: 0,
                tax: 10,
              })
            }
          >
            + Add Item
          </button>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              Description Qty Price Tax
            </div>
          ))}
        </Card>
      </Card>
    </div>
  );
};

export default InvoiceForm;
