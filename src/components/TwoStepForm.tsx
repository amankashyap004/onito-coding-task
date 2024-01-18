import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import DataTableComponent from "./DataTableComponent";

const TwoStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormCompletion = () => {
    setIsFormCompleted(true);
  };

  return (
    <div className="container px-4 md:px-20 py-4 flex justify-center items-center w-full flex-col">
      <div className="w-full flex justify-center items-center">
        {step === 1 && <PersonalDetails onNextStep={handleNextStep} />}
        {step === 2 && (
          <AddressDetails
            onPrevStep={handlePrevStep}
            onFormCompletion={handleFormCompletion}
          />
        )}
      </div>

      {isFormCompleted && (
        <div className="px-4 py-4">
          <DataTableComponent />
        </div>
      )}
    </div>
  );
};

export default TwoStepForm;
