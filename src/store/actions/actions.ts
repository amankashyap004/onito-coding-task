export const setPersonalDetailsData = (personalDetailsData: any) => {
  return {
    type: "SET_PERSONAL_DETAILS_DATA",
    payload: personalDetailsData,
  };
};
export const setAddressDetailsData = (addressDetailsData: any) => {
  return {
    type: "SET_ADDRESS_DETAILS_DATA",
    payload: addressDetailsData,
  };
};
