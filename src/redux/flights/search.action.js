import axios from "axios";
import {
  UPDATE_SEARCH_DATA,
  SEARCH_FLIGHTS_SUCCESS,
  SEARCH_FLIGHTS_FAILURE,
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
  const apiUrl = "http://localhost:8080/api/flights/search";
  const searchParams = new URLSearchParams(requestData);
  const urlWithParams = `${apiUrl}?${searchParams}`;

  try {
    console.log("Request address:" + urlWithParams);
    // async await request with axios. Then wait for the result
    const response = await axios.get(urlWithParams);
    console.log(response.data);

    let destinationCountryCode = null;
    response.data.some((flight) => {
      if (flight.oneWay || !flight.tickets.departure_ticket.length) {
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