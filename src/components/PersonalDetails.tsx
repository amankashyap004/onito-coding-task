import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface PersonalData {
  fullName: string;
}

interface PersonalDetailsProps {
  personalData: PersonalData;
  onPersonalDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  personalData,
  onPersonalDataChange,
  onNextStep,
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="flex justify-start items-center w-full">
        <p className="text-sm md:text-lg font-medium">
          Step 1: Personal Details
        </p>
      </div>
      <TextField
        label="Name"
        name="fullName"
        value={personalData.fullName}
        onChange={onPersonalDataChange}
        fullWidth
        margin="normal"
      />
      <div className="flex justify-end items-center w-full">
        <Button variant="contained" color="primary" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
