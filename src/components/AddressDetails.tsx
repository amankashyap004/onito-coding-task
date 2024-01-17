import React, { useState } from "react";
import { object, string } from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddressData {
  address: string;
  state: string;
  city: string;
  country: string;
  pinCode: string;
}

interface AddressDetailsProps {
  addressData: AddressData;
  onAddressDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevStep: () => void;
  onSubmit: () => void;
}

const addressSchema = object({
  address: string(),
  state: string(),
  city: string(),
  country: string().required("Country is required"),
  pinCode: string()
    .required("Pin Code is required")
    .matches(/^\d+$/, "Pin Code must be numeric"),
});

const AddressDetails: React.FC<AddressDetailsProps> = ({
  addressData,
  onAddressDataChange,
  onPrevStep,
  onSubmit,
}) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const handleNextStep = () => {
    addressSchema
      .validate(addressData, { abortEarly: false })
      .then(() => {
        onSubmit();
      })
      .catch((errors) => {
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
        <p className="text-sm md:text-lg font-medium">Step 2: Address</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 md:gap-4 w-full">
        <TextField
          label="Address"
          name="address"
          value={addressData.address}
          onChange={onAddressDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          name="state"
          value={addressData.state}
          onChange={onAddressDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={addressData.city}
          onChange={onAddressDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          value={addressData.country}
          onChange={onAddressDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["country"]}
          helperText={formErrors["country"]}
        />
        <TextField
          label="PinCode"
          name="pinCode"
          value={addressData.pinCode}
          onChange={onAddressDataChange}
          fullWidth
          margin="normal"
          error={!!formErrors["pinCode"]}
          helperText={formErrors["pinCode"]}
        />
      </section>
      <div className="flex justify-end items-center w-full gap-4">
        <Button variant="contained" onClick={onPrevStep}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextStep}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressDetails;
