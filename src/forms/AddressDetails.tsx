import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPinPen } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ButtonChildren from "../components/ChildrenButtom";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

interface AddressDetailsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AddressDetails = ({ setStep, step }: AddressDetailsProps) => {
  const navigate = useNavigate();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();

  const notifi = () => {
    toast.success("CUSTOMER ADDED SUCCESSFULLY!", {
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

  const onSubmit = (data: Record<string, unknown>) => {
    // Get existing customers
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    // Add new customer
    customers.push({
      id: Math.floor(Math.random() * 100) + 1,
      ...data,
    });

    // Save back to localStorage
    localStorage.setItem("customers", JSON.stringify(customers));
    console.log(
      "Saved:",
      JSON.parse(localStorage.getItem("customers") || "[]"),
    );

    // Show toast
    notifi();

    // Go to dashboard after a short delay
    setTimeout(() => {
      navigate("/customer-page");
    }, 3000);
  };

  const handleNext = async () => {
    // Only validate this step's fields — NOT the whole form/schema
    const isValid = await trigger(["address", "city", "state"]);

    if (isValid) {
      // Use getValues() instead of handleSubmit(), since handleSubmit
      // re-validates the ENTIRE multi-step schema (including fields
      // from other steps), which silently blocks submission if any
      // unrelated field elsewhere hasn't been filled/validated yet.
      onSubmit(getValues());
    }
  };

  const steps = [
    { number: "✓", label: "STEP 1", title: "Personal" },
    { number: 2, label: "STEP 2", title: "Address" },
    { number: 3, label: "STEP 3", title: "Review" },
  ];

  return (
    <div className="flex flex-col justify-center items-center  bg-[#f1f5f9] rounded-xl px-4 py-8  ">
      <div className="flex flex-col lg:flex-row w-full max-w-[700px] justify-between items-center lg:items-center gap-6 lg:gap-4 overflow-y-auto">
        {/* Title */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Customers
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and track customer billings effortlessly.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6">
          {steps.map((s) => (
            <div key={s.number} className="flex items-center gap-2">
              <div className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-xl flex items-center justify-center font-medium text-sm">
                {s.number}
              </div>
              <div className="whitespace-nowrap">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-sm font-medium">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="w-full max-w-[700px] lg:w-1/2 p-6 sm:p-12 mt-6">
        <div className="flex border-b border-black p-4 gap-3">
          <MapPinPen />
          <h1>Address Details</h1>
        </div>

        <Field>
          <FieldLabel htmlFor="input-address">
            Street Address <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-address"
            type="text"
            placeholder="Jimmy mcgill"
            {...register("address")}
            className="bg-[#f1f5f9] p-6"
          />
          <p className="text-red-500">{errors.address?.message as string}</p>
        </Field>

        {/* row2 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Field className="w-full">
            <FieldLabel htmlFor="input-city">
              City <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-city"
              type="text"
              placeholder="Albequrqe"
              className="bg-[#f1f5f9] p-6"
              {...register("city")}
            />
            <p className="text-red-500">{errors.city?.message as string}</p>
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="input-state">
              State/Province <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-state"
              type="text"
              placeholder="New mexico"
              className="bg-[#f1f5f9] p-6"
              {...register("state")}
            />
            <p className="text-red-500">{errors.state?.message as string}</p>
          </Field>
        </div>

        {/* row3 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Field className="w-full">
            <FieldLabel htmlFor="input-zip">
              Zip code <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-zip"
              type="number"
              placeholder="625007"
              className="bg-[#f1f5f9] p-6"
              {...register("zip")}
            />
            <p className="text-red-500">{errors.zip?.message as string}</p>
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="input-country">
              Country <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-country"
              type="text"
              placeholder="India"
              className="bg-[#f1f5f9] p-6"
              {...register("country")}
            />
            <p className="text-red-500">{errors.country?.message as string}</p>
          </Field>
        </div>

        <Field className="flex flex-row items-center bg-transparent">
          <Input
            id="input-shipping-same"
            type="checkbox"
            {...register("shippingSame")}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <FieldLabel
            htmlFor="input-shipping-same"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Shipping address is the same as billing
          </FieldLabel>
        </Field>

        {/* navigation */}
        <div className="flex justify-between items-center w-full mt-6">
          <h1
            className="text-gray-500 text-sm p-2 cursor-pointer hover:text-black"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </h1>

          <ButtonChildren type="button" onClick={handleNext}>
            Continue
          </ButtonChildren>
        </div>
      </Card>
    </div>
  );
};

export default AddressDetails;
