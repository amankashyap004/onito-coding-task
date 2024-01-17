import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";

const TwoStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container px-4 md:px-20 py-4 flex justify-center items-center w-full">
      <div className="w-full md:w-3/4">
        {step === 1 && <PersonalDetails onNextStep={handleNextStep} />}

        {step === 2 && <AddressDetails onPrevStep={handlePrevStep} />}
      </div>
    </div>
  );
};

export default TwoStepForm;
