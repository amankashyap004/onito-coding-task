import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

interface PersonalData {
  fullName: string;
  age: string;
  sex: string;
  mobileNo: string;
  govtIdType: string;
  govtId: string;
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
        <p className="text-base md:text-lg font-medium">
          Step 1: Personal Details
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 md:gap-4 w-full">
        <TextField
          label="Name*"
          name="fullName"
          value={personalData.fullName}
          onChange={onPersonalDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="DOB or Age*"
          name="age"
          value={personalData.age}
          onChange={onPersonalDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sex"
          name="sex"
          value={personalData.sex}
          onChange={onPersonalDataChange}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          label="Mobile No"
          name="mobileNo"
          value={personalData.mobileNo}
          onChange={onPersonalDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Govt Issued ID Type"
          name="govtIdType"
          value={personalData.govtIdType}
          onChange={onPersonalDataChange}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="aadhar">Aadhar</MenuItem>
          <MenuItem value="pan">PAN</MenuItem>
        </TextField>
        <TextField
          label="Govt Issued ID"
          name="govtId"
          value={personalData.govtId}
          onChange={onPersonalDataChange}
          fullWidth
          margin="normal"
        />
      </section>
      <div className="flex justify-end items-center w-full">
        <Button variant="contained" color="primary" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
