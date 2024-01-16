import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";

interface PersonalData {
  fullName: string;
}

interface AddressData {
  address: string;
}

const TwoStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: "",
  });

  const [addressData, setAddressData] = useState<AddressData>({
    address: "",
  });

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", { personalData, addressData });
  };

  return (
    <div className="container px-4 md:px-20 py-4 flex justify-center items-center w-full">
      <div className="w-full md:w-3/4">
        {step === 1 && (
          <PersonalDetails
            personalData={personalData}
            onPersonalDataChange={handlePersonalDataChange}
            onNextStep={handleNextStep}
          />
        )}

        {step === 2 && (
          <AddressDetails
            addressData={addressData}
            onAddressDataChange={handleAddressDataChange}
            onPrevStep={handlePrevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TwoStepForm;
