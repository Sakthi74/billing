import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import ButtonChildren from "../components/ChildrenButtom";
import { useFormContext } from "react-hook-form";

const PersonalDetails = ({ step, setStep }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(["fullName", "email", "phone"]);

    if (isValid) {
      setStep(step + 1);
      
    }
  };

  const steps = [
    { number: 1, label: "STEP 1", title: "Personal" },
    { number: 2, label: "STEP 2", title: "Address" },
    { number: 3, label: "STEP 3", title: "Review" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f1f5f9] rounded-xl px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-[700px] justify-between items-center lg:items-center gap-6 lg:gap-4">
        {/* Title */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Invoices
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
          <User />
          <h1>Personal Details</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="input-full-name">
            Full Name <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-full-name"
            type="text"
            placeholder="Jimmy mcgill"
            className="bg-[#f1f5f9] p-6"
            {...register("fullName")}
          />
          <p className="text-red-500">{errors.fullName?.message as string}</p>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-email">
            Email <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-email"
            type="email"
            className="bg-[#f1f5f9] p-6"
            placeholder="Salugoodman@gmail.com"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message as string}</p>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-phone">
            Phone Number <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-phone"
            type="tel"
            className="bg-[#f1f5f9] p-6"
            placeholder="9924668212"
            {...register("phone")}
          />
          <p className="text-red-500">{errors.phone?.message as string}</p>
        </Field>

        {/* navigation */}
        <div className="flex justify-between items-center w-full mt-6">
          <h1
            className="text-gray-500 text-sm p-2 cursor-pointer hover:text-black"
            onClick={() => setStep(step - 1)}
          >
            Cancel
          </h1>

          <ButtonChildren type="button" onClick={handleNext}>
            Continue
          </ButtonChildren>
        </div>
      </Card>
    </div>
  );
};

export default PersonalDetails;