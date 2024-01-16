import React, { useState } from "react";
import { object, string } from "yup";

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

const personalDataSchema = object({
  fullName: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: string()
    .required("DOB or Age is required")
    .matches(/^[1-9]\d*$/, "Age must be a positive integer"),
  sex: string().required("Sex is required"),
  mobileNo: string().matches(/^\d{10}$/, "Mobile No must be a 10-digit number"),
  govtIdType: string(),
  govtId: string(),
});

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  personalData,
  onPersonalDataChange,
  onNextStep,
}) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const handleNextStep = () => {
    personalDataSchema
      .validate(personalData, { abortEarly: false })
      .then(() => {
        // Proceed to the next step
        onNextStep();
      })
      .catch((errors) => {
        // console.error(errors.errors);
        const newErrors: { [key: string]: string } = {};

        errors.inner.forEach((error: { path: any; message: string }) => {
          newErrors[error.path!] = error.message;
        });

        setFormErrors(newErrors);
      });
  };

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
          error={!!formErrors["fullName"]}
          helperText={formErrors["fullName"]}
        />
        <TextField
          label="DOB or Age*"
          name="age"
          value={personalData.age}
          onChange={onPersonalDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["age"]}
          helperText={formErrors["age"]}
        />
        <TextField
          label="Sex"
          name="sex"
          value={personalData.sex}
          onChange={onPersonalDataChange}
          select
          fullWidth
          margin="normal"
          error={!!formErrors["sex"]}
          helperText={formErrors["sex"]}
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
          error={!!formErrors["mobileNo"]}
          helperText={formErrors["mobileNo"]}
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
          error={!!formErrors["govtId"]}
          helperText={formErrors["govtId"]}
        />
      </section>
      <div className="flex justify-end items-center w-full">
        <Button variant="contained" color="primary" onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
