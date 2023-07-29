import axios from "axios";
import plugsActionTypes from "./plugs.types";

export const FETCH_PLUGS_TYPE = (payload) => {
  return {
    type: plugsActionTypes.fetchPlugsType,
    payload: payload,
  };
};

//takes in alpha2 country code as parameter to fetch the plugs info from database
export const FETCH_PLUGS_TYPE_THUNK = (countryCode) => {
  return async (dispatch) => {
    try {
      const result =
        await axios.get(`https://ticket-wing-man-backend.vercel.app/
api/plugs/?counterCode=${countryCode.toUpperCase()}`);
      dispatch(FETCH_PLUGS_TYPE(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
