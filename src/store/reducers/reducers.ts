const initialState = {
  personalDetailsData: [],
};

const reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "SET_PERSONAL_DETAILS_DATA":
      return {
        ...state,
        personalDetailsData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
