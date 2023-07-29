import axios from "axios";
import {
  UPDATE_SEARCH_DATA,
  SEARCH_FLIGHTS_SUCCESS,
  SEARCH_FLIGHTS_FAILURE,
  DISPLAY_USER_FLIGHTS,
  INSERT_USER_FLIGHTS,
  DELETE_USER_FLIGHTS,
} from "./search.types";

export const updateSearchData = (
  fromValue,
  toValue,
  departValue,
  returnValue
) => ({
  type: UPDATE_SEARCH_DATA,
  payload: { fromValue, toValue, departValue, returnValue },
});

export const searchFlights = (requestData) => async (dispatch) => {
  const apiUrl =
    "https://ticketwingman-backend.onrender.com/api/flights/search";
  const searchParams = new URLSearchParams(requestData);
  const urlWithParams = `${apiUrl}?${searchParams}`;

  try {
    console.log("Request address:" + urlWithParams);
    // async await request with axios. Then wait for the result
    axios.defaults.withCredentials = false;
    const response = await axios.get(urlWithParams);
    console.log(response.data);

    let destinationCountryCode = null;
    response.data.some((flight) => {
      if (!flight.tickets.departure_ticket.length) {
        // If non stop flight, return the country code of the arrival destination
        destinationCountryCode =
          flight.tickets.departure_ticket[0].arrival.location.countryCode;
        return true; // End loop
      } else {
        // If layover flight, return the last arrival destination in different tickets
        const lastDepartureTicket =
          flight.tickets.departure_ticket[
            flight.tickets.departure_ticket.length - 1
          ];
        destinationCountryCode =
          lastDepartureTicket.arrival.location.countryCode;
        return true; // End loop
      }
    });
    console.log("Arrival country's country code:" + destinationCountryCode);
    // Use arrival destination in flight tickets to check travel advisory api
    axios.defaults.withCredentials = false;
    const secondApiUrl = `https://www.travel-advisory.info/api?countrycode=${destinationCountryCode}`;
    const secondResponse = await axios.get(secondApiUrl);
    console.log("Travel Advisory:" + JSON.stringify(secondResponse.data));

    const combinedData = {
      countryData: secondResponse.data, //Country
      travelAdvisoryData: response.data, //Flight
    };

    dispatch({ type: SEARCH_FLIGHTS_SUCCESS, payload: combinedData });
  } catch (error) {
    // Error handling when request fail
    dispatch({ type: SEARCH_FLIGHTS_FAILURE, payload: error.message });
  }
};

export const displayUserFlight = (userID) => {
  return async (dispatch) => {
    try {
      const result =
        await axios.get(`https://ticketwingman-backend.onrender.com/
api/flights?id=${userID}`);
      dispatch({ type: DISPLAY_USER_FLIGHTS, payload: result.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const insertUserFlight = (
  userEmail,
  carrierCode,
  flightNumber,
  scheduledDepartureDate,
  cabin_class
) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "https://ticketwingman-backend.onrender.com/api/flights/newflight",
        {
          userEmail,
          carrierCode,
          flightNumber,
          scheduledDepartureDate,
          cabin_class,
        }
      );
      dispatch({ type: INSERT_USER_FLIGHTS, payload: result });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUserFlight = (flightID, userID) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "https://ticketwingman-backend.onrender.com/api/flights/delete",
        { flightID, userID }
      );
      dispatch({ type: DELETE_USER_FLIGHTS, payload: result.data });
    } catch (err) {
      console.log(err);
    }
  };
};
