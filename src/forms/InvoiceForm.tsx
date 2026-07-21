import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ButtonChildren from "../components/ChildrenButtom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { invoiceSchema, type invoiceFormData } from "../schema/InvoiceSchema";

import { ReceiptText, Trash2 } from "lucide-react";

const InvoiceForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,

    control,
    formState: { errors },
  } = useForm<invoiceFormData>({
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
  const notifi = () => {
    toast.success("INVOICE ADDED SUCCESSFULLY!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const items = watch("items");
  const subTotal = items.reduce((total: number, num) => {
    return total + num.quantity * num.price;
  }, 0);
  const taxTotal = items.reduce((total: number, num) => {
    return total + (num.quantity * num.price * num.tax) / 100;
  }, 0);
  const grantTotal = subTotal + taxTotal;
  const navigate = useNavigate();

  const customers = JSON.parse(localStorage.getItem("customers") || "[]");

  //onsubmit function
  const onSubmit = (data: invoiceFormData) => {
    const invoice = JSON.parse(localStorage.getItem("invoice") || "[]");
    //finding customer to get name
    const selectedCustomer = customers.find(
      (customer: any) => customer.id === Number(data.customerId),
    );

    invoice.push({
      id: Math.floor(Math.random() * 100) + 1,
      customerName: selectedCustomer?.fullName || "",
      ...data,
    });
    localStorage.setItem("invoice", JSON.stringify(invoice));
    notifi();
    setTimeout(() => {
      navigate("/invoice-page");
    }, 2000);

    console.log(invoice);
  };

  //validation fuction
  const onValidate = async () => {
    const isValid = await trigger([
      "customerId",
      "invoiceDate",
      "dueDate",
      "items.0.description",
      "items.0.quantity",
      "items.0.price",
      "items.0.tax",
    ]);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className="flex flex-col p-4  lg:p-0 w-screen">
      <Card className="w-full max-w-screen h-screen max-h-[600px] lg:max-h-screen overflow-y-auto md:overflow-y-hidden lg:overflow-y-hidden lg:w-1/2 p-6 sm:p-12 mt-6">
        <div className="flex border-b border-black p-4 gap-3">
          <ReceiptText />
          <h1 className="font-bold">Create New Invoice</h1>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <Field>
            <FieldLabel htmlFor="input-customer-id">
              Customer Name <sup className="text-red-500">*</sup>
            </FieldLabel>
            <select
              id="input-customer-id"
              {...register("customerId")}
              className="bg-[#f1f5f9] p-3 rounded-md cursor-pointer"
            >
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
            </select>
            <p className="text-red-500">
              {errors.customerId?.message as string}
            </p>
          </Field>

          <div className="flex lg:flex-row md:flex-row flex-col gap-3">
            <Field>
              <FieldLabel htmlFor="input-invoice-date">
                Invoice Date <sup className="text-red-500">*</sup>
              </FieldLabel>
              <Input
                id="input-invoice-date"
                type="date"
                className="bg-[#f1f5f9] p-6"
                {...register("invoiceDate")}
              />
              <p className="text-red-500">
                {errors.invoiceDate?.message as string}
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="input-due-date">
                Due Date <sup className="text-red-500">*</sup>
              </FieldLabel>
              <Input
                id="input-due-date"
                type="date"
                className="bg-[#f1f5f9] p-6"
                {...register("dueDate")}
              />
              <p className="text-red-500">
                {errors.dueDate?.message as string}
              </p>
            </Field>
          </div>

          <Card className="p-4 mt-4">
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
              className="mb-3 text-sm font-medium text-indigo-600 cursor-pointer hover:text-green-400 lg:ml-96 ml-48  md:ml-96 text-"
            >
              + Add Item
            </button>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-wrap gap-3 items-end mb-3"
              >
                <Field className="flex-1 min-w-[140px]">
                  <FieldLabel htmlFor={`item-description-${index}`}>
                    Description
                  </FieldLabel>
                  <Input
                    id={`item-description-${index}`}
                    type="text"
                    className="bg-[#f1f5f9] p-4"
                    {...register(`items.${index}.description` as const)}
                  />
                  <p className="text-red-500">
                    {errors.items?.[index]?.description?.message as string}
                  </p>
                </Field>

                <Field className="w-24">
                  <FieldLabel htmlFor={`item-quantity-${index}`}>
                    Qty
                  </FieldLabel>
                  <Input
                    id={`item-quantity-${index}`}
                    type="number"
                    className="bg-[#f1f5f9] p-4"
                    {...register(`items.${index}.quantity` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-red-500">
                    {errors.items?.[index]?.quantity?.message as string}
                  </p>
                </Field>

                <Field className="w-28">
                  <FieldLabel htmlFor={`item-price-${index}`}>Price</FieldLabel>
                  <Input
                    id={`item-price-${index}`}
                    type="number"
                    className="bg-[#f1f5f9] p-4"
                    {...register(`items.${index}.price` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-red-500">
                    {errors.items?.[index]?.price?.message as string}
                  </p>
                </Field>

                <Field className="w-24">
                  <FieldLabel htmlFor={`item-tax-${index}`}>Tax</FieldLabel>
                  <Input
                    id={`item-tax-${index}`}
                    type="number"
                    className="bg-[#f1f5f9] p-4"
                    {...register(`items.${index}.tax` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-red-500">
                    {errors.items?.[index]?.tax?.message as string}
                  </p>
                </Field>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="p-2 text-red-500 disabled:opacity-30"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </Card>

          <Card className="mt-6 p-5 bg-slate-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <h1 className="text-gray-600 font-medium">SUB TOTAL</h1>
              <h1 className="text-lg font-semibold text-gray-800">
                ${subTotal.toFixed(2)}
              </h1>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <h1 className="text-gray-600 font-medium">TAXES</h1>
              <h1 className="text-lg font-semibold text-gray-800">
                ${taxTotal.toFixed(2)}
              </h1>
            </div>

            <div className="flex justify-between items-center pt-4">
              <h1 className="text-xl font-bold text-indigo-600">Grand Total</h1>
              <h1 className="text-2xl font-bold text-indigo-600">
                ${grantTotal.toFixed(2)}
              </h1>
            </div>
          </Card>

          <div className="flex justify-end mt-6">
            <ButtonChildren type="button" onClick={onValidate}>
              Save Invoice
            </ButtonChildren>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InvoiceForm;
