import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddressData {
  address: string;
}

interface AddressDetailsProps {
  addressData: AddressData;
  onAddressDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevStep: () => void;
  onSubmit: () => void;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  addressData,
  onAddressDataChange,
  onPrevStep,
  onSubmit,
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="flex justify-start items-center w-full">
        <p className="text-sm md:text-lg font-medium">Step 2: Address</p>
      </div>
      <TextField
        label="Address"
        name="address"
        value={addressData.address}
        onChange={onAddressDataChange}
        fullWidth
        margin="normal"
      />
      <div className="flex justify-end items-center w-full gap-4">
        <Button variant="contained" onClick={onPrevStep}>
          Previous
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressDetails;
