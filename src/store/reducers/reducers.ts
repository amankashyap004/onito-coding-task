const initialState = {
  personalDetailsData: [],
  addressDetailsData: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_PERSONAL_DETAILS_DATA":
      return {
        ...state,
        personalDetailsData: action.payload,
      };

    case "SET_ADDRESS_DETAILS_DATA":
      return {
        ...state,
        addressDetailsData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
