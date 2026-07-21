import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalDetails from "../forms/PersonalDetails";
import AddressDetails from "../forms/AddressDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../components/Navbar";
import { customerschema } from "../schema/customerschema";
import type { customerFormData } from "../schema/customerschema";

const AddCustomer = () => {
  const [step, setStep] = useState(1);
  const form = useForm<customerFormData>({
    resolver: zodResolver(customerschema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    },
  });

  return (
    <>
      <Navbar />
      <FormProvider {...form}>
        <form>
          {step === 1 && <PersonalDetails setStep={setStep} step={step} />}

          {step === 2 && <AddressDetails setStep={setStep} step={step} />}
        </form>
      </FormProvider>
    </>
  );
};

export default AddCustomer;
