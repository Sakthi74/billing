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
  return (
    <div className="flex justify-center items-center h-screen bg-[#f1f5f9]">
      <Card className="lg:w-1/2 w-7/8 p-12 ">
        <div className="flex border-b-1 border-black p-4 gap-3">
          <User />
          <h1>Personal Details</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">
            Full Name <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-demo-api-key"
            type="text"

            placeholder="Jimmy mcgill"
            className="bg-[#f1f5f9] p-6"
            {...register("fullName")}
          />
          <p className="text-red-500">{errors.fullName?.message as string}</p>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">
            Email <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-demo-api-key"
            type="email"
            className="bg-[#f1f5f9] p-6"
            placeholder="Salugoodman@gmail.com"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message as string}</p>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">
            Phone Number <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-demo-api-key"
            type="tel"
            className="bg-[#f1f5f9] p-6"
            placeholder="9924668212"
            {...register("phone")}
          />
          <p className="text-red-500">{errors.phone?.message as string}</p>
        </Field>

        {/* navigation */}
        <div className="flex justify-between w-screen">
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
