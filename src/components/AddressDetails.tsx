import React, { useState, useEffect } from "react";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch } from "react-redux";
import { setAddressDetailsData } from "../store/actions/actions";

interface AddressData {
  address: string;
  state: string;
  city: string;
  country: string;
  pinCode: string;
}

const initialAddressData: AddressData = {
  address: "",
  state: "",
  city: "",
  country: "",
  pinCode: "",
};

interface AddressDetailsProps {
  onPrevStep: () => void;
  onFormCompletion: () => void;
}

const addressSchema = object({
  address: string(),
  state: string(),
  city: string(),
  country: string().required("Country is required"),
  pinCode: string()
    .required("Pin Code is required")
    .matches(/^\d{6}$/, "Pin Code must be a 6-digit numeric"),
});

const AddressDetails: React.FC<AddressDetailsProps> = ({
  onPrevStep,
  onFormCompletion,
}) => {
  const dispatch = useDispatch();

  const [addressData, setAddressData] =
    useState<AddressData>(initialAddressData);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  const handleAddressDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validate and update pin code with only 6-digit numeric values
    if (name === "pinCode" && (!/^\d{0,6}$/.test(value) || value.length > 6)) {
      return;
    }

    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleCountryChange = (_: any, value: string | null) => {
    setAddressData((prevData) => ({
      ...prevData,
      country: value || "",
    }));
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors["country"];
      return newErrors;
    });
  };

  const handleSubmit = () => {
    addressSchema
      .validate(addressData, { abortEarly: false })
      .then(() => {
        setFormErrors({});
        onFormCompletion();
        setAddressData(initialAddressData);
        setSubmitTrigger(true);
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
    const fetchCountrySuggestions = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        setCountrySuggestions(
          countries.map((country: any) => country.name.common)
        );
      } catch (error) {
        console.error("Error fetching country suggestions:", error);
      }
    };

    fetchCountrySuggestions();
  }, []);

  useEffect(() => {
    dispatch(setAddressDetailsData(addressData));
  }, [dispatch, addressData]);

  useEffect(() => {
    if (submitTrigger) {
      setAddressData((prevData) => ({
        ...prevData,
        country: "",
      }));
      setSubmitTrigger(false);
    }
  }, [submitTrigger]);

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-full">
      <div className="flex justify-start items-center w-full">
        <p className="text-sm md:text-lg font-medium">Step 2: Address</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 md:gap-4 w-full">
        <TextField
          label="Address"
          name="address"
          value={addressData.address}
          onChange={handleAddressDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          name="state"
          value={addressData.state}
          onChange={handleAddressDataChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={addressData.city}
          onChange={handleAddressDataChange}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          options={countrySuggestions}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              name="country"
              value={addressData.country}
              onChange={(e: any) => handleAddressDataChange(e)}
              fullWidth
              margin="normal"
              error={!!formErrors["country"]}
              helperText={formErrors["country"]}
            />
          )}
          onChange={handleCountryChange}
          // value={submitTrigger ? "" : addressData.country}
          value={addressData.country}
        />
        <TextField
          label="Pin Code"
          name="pinCode"
          value={addressData.pinCode}
          onChange={handleAddressDataChange}
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressDetails;
