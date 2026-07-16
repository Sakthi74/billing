import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPinPen } from "lucide-react";
import ButtonChildren from "../components/ChildrenButtom";

const AddressDetails = ({ setStep, step }) => {
  return (
    <div className="flex  flex-col justify-center items-center h-screen bg-[#f1f5f9] rounded-xl">
      <div className="flex sm:flex-col md:flex-row lg:flex-row w-[600px] justify-between">
        <div className="lg:p-6 flex flex-col  justify-center ">
          <h1 className="lg:text-4xl md:text-3xl text-2xl  font-semibold">
            Invoices
          </h1>
          <p className="text-gray-500 text-sm ">
            Manage and track customer billings effortlessly.
          </p>
        </div>

        {/* Step 1 */}
        <div className="flex sm:flex-col md:flex-row lg:flex-row">
          <div className="w-10 h-10 mx-[10px] mt-[12px] bg-slate-900 text-white rounded-xl flex items-center justify-center font-medium text-sm">
            1
          </div>

          <div className="mt-[10px]">
            <p>STEP 1</p>
            <p>Personal</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex">
          <div className="w-10 h-10 mx-[10px] mt-[12px] bg-slate-900 text-white rounded-xl flex items-center justify-center font-medium text-sm">
            2
          </div>

          <div className="mt-[10px]">
            <p>STEP 2</p>
            <p>Address</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex">
          <div className="w-10 h-10 mx-[10px] mt-[12px] bg-slate-900 text-white rounded-xl flex items-center justify-center font-medium text-sm">
            3
          </div>

          <div className="mt-[10px]">
            <p>STEP 3</p>
            <p>Review</p>
          </div>
        </div>
      </div>
      <Card className="lg:w-1/2 w-9/10 p-12 ">
        <div className="flex border-b-1 border-black p-4 gap-3">
          <MapPinPen />
          <h1>Address Details</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">
            Street Address <sup className="text-red-500">*</sup>
          </FieldLabel>
          <Input
            id="input-demo-api-key"
            type="text"
            placeholder="Jimmy mcgill"
            className="bg-[#f1f5f9] p-6"
          />
        </Field>

        {/* row2 */}

        <div className="flex gap-2">
          <Field>
            <FieldLabel htmlFor="input-demo-api-key">
              City <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-demo-api-key"
              type="text"
              placeholder="Albequrqe"
              className="bg-[#f1f5f9] p-6"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-demo-api-key">
              State/Province <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-demo-api-key"
              type="text"
              placeholder="New mexico"
              className="bg-[#f1f5f9] p-6"
            />
          </Field>
        </div>

        {/* row3 */}

        <div className="flex gap-2">
          <Field>
            <FieldLabel htmlFor="input-demo-api-key">
              Zip code <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-demo-api-key"
              type="number"
              placeholder="625007"
              className="bg-[#f1f5f9] p-6"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-demo-api-key">
              Country <sup className="text-red-500">*</sup>
            </FieldLabel>
            <Input
              id="input-demo-api-key"
              type="text"
              placeholder="India"
              className="bg-[#f1f5f9] p-6"
            />
          </Field>
        </div>

        <Field className=" flex flex-row  bg-transparent">
          <Input
            id="input-demo-api-key"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <FieldLabel
            htmlFor="input-demo-api-key"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Shipping address is the same as billing
          </FieldLabel>
        </Field>

        {/* navigation */}
        <div className="flex justify-between w-screen">
          <h1
            className="text-gray-500 text-sm p-2 cursor-pointer hover:text-black"
            onClick={() => setStep(step - 1)}
          >
            Cancel
          </h1>

          <div onClick={() => setStep(step + 1)} className="w-full">
            <ButtonChildren>Continue</ButtonChildren>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddressDetails;
