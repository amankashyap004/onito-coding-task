import React, { useState, useEffect } from "react";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch } from "react-redux";
import { setPersonalDetailsData } from "../store/actions/actions";

interface PersonalData {
  fullName: string;
  age: string;
  sex: string;
  mobileNo: string;
  govtIdType: string;
  govtId: string;
}

const initialPersonalData: PersonalData = {
  fullName: "",
  age: "",
  sex: "",
  mobileNo: "",
  govtIdType: "",
  govtId: "",
};

interface PersonalDetailsProps {
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
  govtIdType: string().required("Govt ID Type is required"),
  govtId: string().test(
    "govtIdValidation",
    "Govt ID is required",
    function (value: any, context) {
      const govtIdType = context.parent.govtIdType;

      if (!govtIdType) {
        return true;
      }

      if (govtIdType === "aadhar") {
        if (!/^[2-9][0-9]{11}$/.test(value)) {
          return this.createError({
            path: "govtId",
            message:
              "Aadhar should have 12 numeric digits and should not start with 0 and 1",
          });
        }
      } else if (govtIdType === "pan") {
        if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
          return this.createError({
            path: "govtId",
            message: "PAN should be a ten-character long alpha-numeric string",
          });
        }
      }
      return true;
    }
  ),
});

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ onNextStep }) => {
  const dispatch = useDispatch();

  const [personalData, setPersonalData] =
    useState<PersonalData>(initialPersonalData);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleNextStep = () => {
    personalDataSchema
      .validate(personalData, { abortEarly: false })
      .then(() => {
        // Proceed to the next step
        onNextStep();
        setPersonalData(initialPersonalData);
      })
      .catch((errors) => {
        const newErrors: { [key: string]: string } = {};

        errors.inner.forEach((error: { path: any; message: string }) => {
          newErrors[error.path!] = error.message;
        });

        setFormErrors(newErrors);
      });
  };

  useEffect(() => {
    dispatch(setPersonalDetailsData(personalData));
  }, [dispatch, personalData]);

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-full">
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
          onChange={handlePersonalDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["fullName"]}
          helperText={formErrors["fullName"]}
        />
        <TextField
          label="DOB or Age*"
          name="age"
          value={personalData.age}
          onChange={handlePersonalDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["age"]}
          helperText={formErrors["age"]}
        />
        <TextField
          label="Sex"
          name="sex"
          value={personalData.sex}
          onChange={handlePersonalDataChange}
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
          onChange={handlePersonalDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["mobileNo"]}
          helperText={formErrors["mobileNo"]}
        />
        <TextField
          label="Govt Issued ID Type"
          name="govtIdType"
          value={personalData.govtIdType}
          onChange={handlePersonalDataChange}
          select
          fullWidth
          margin="normal"
          error={!!formErrors["govtIdType"]}
          helperText={formErrors["govtIdType"]}
        >
          <MenuItem value="aadhar">Aadhar</MenuItem>
          <MenuItem value="pan">PAN</MenuItem>
        </TextField>
        {personalData.govtIdType && (
          <TextField
            label="Govt Issued ID"
            name="govtId"
            value={personalData.govtId}
            onChange={handlePersonalDataChange}
            fullWidth
            margin="normal"
            error={!!formErrors["govtId"]}
            helperText={formErrors["govtId"]}
          />
        )}
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
