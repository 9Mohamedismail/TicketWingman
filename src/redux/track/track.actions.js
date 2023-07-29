import axios from "axios";
import trackActionTypes from "./track.types";

export const FETCH_FLIGHT = (payload) => {
  return {
    type: trackActionTypes.GET_FLIGHT,
    payload: payload,
  };
};

export const FETCH_FLIGHT_THUNK = (flightObject) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        "https://ticket-wing-man-backend.vercel.app/api/track/",
        {
          params: flightObject,
        }
      );
      dispatch(FETCH_FLIGHT(result.data));
    } catch (err) {
      console.error(err);
    }
  };
};
