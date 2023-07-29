import trackActionTypes from "./track.types";

const INITIAL_STATE = {
  flightData: null,
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case trackActionTypes.GET_FLIGHT:
      return {
        ...state,
        flightData: action.payload,
      };
    default:
      return state;
  }
};

export default trackReducer;
