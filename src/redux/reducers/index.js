const initialState = {
  loading: false,
  leadList: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "START_GET_DATA_REQUEST":
      return { ...state, loading: true };
    case "START_GET_DATA_REQUEST_SUCCESS":
      return { ...state, loading: false, leadList: payload };
    case "START_GET_DATA_REQUEST_FAIL":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
