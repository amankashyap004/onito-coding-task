import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import DataTableComponent from "./DataTableComponent";

import { useSelector } from "react-redux";
import {
  getPersonalDetailsData,
  getAddressDetailsData,
} from "../store/selectors/selectors";

const TwoStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const updatedPersonalData = useSelector(getPersonalDetailsData);
  const updatedAddressData = useSelector(getAddressDetailsData);

  const handleShow = () => {
    // console.log(updatedPersonalData);
    // console.log(updatedAddressData);
    const newData = {
      fullName: updatedPersonalData.fullName,
      age: updatedPersonalData.age,
      sex: updatedPersonalData.sex,
      mobileNo: updatedPersonalData.mobileNo,
      govtIdType: updatedPersonalData.govtIdType,
      govtId: updatedPersonalData.govtId,
      address: updatedAddressData.address,
      city: updatedAddressData.city,
      state: updatedAddressData.state,
      country: updatedAddressData.country,
      pinCode: updatedAddressData.pinCode,
    };

    setTableData((prevData) => [...prevData, newData]);
  };

  const handleFormCompletion = () => {
    setIsFormCompleted(true);
    handleShow();
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
        <div className="py-4 overflow-x-auto w-full">
          <DataTableComponent
            tableData={tableData}
            setTableData={setTableData}
          />
        </div>
      )}
    </div>
  );
};

export default TwoStepForm;
