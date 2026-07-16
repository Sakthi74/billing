import { useState,useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalDetails from "../forms/PersonalDetails";
import AddressDetails from "../forms/AddressDetails";
import { zodResolver } from "@hookform/resolvers/zod";
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
    },
  });

  useEffect(() => {
  const saved = localStorage.getItem("customerDraft");

  if (saved) {
    form.reset(JSON.parse(saved));
  }
}, []);

const values = form.watch();

useEffect(() => {
  localStorage.setItem("customerDraft", JSON.stringify(values)||"[]");
}, [values]);

  return (
    <>
      <FormProvider {...form}>
        <form action="">
          {step === 1 && <PersonalDetails setStep={setStep} step={step} />}

          {step === 2 && <AddressDetails setStep={setStep} step={step} />}
        </form>
      </FormProvider>
    </>
  );
};

export default AddCustomer;
