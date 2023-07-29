import {
  UPDATE_SEARCH_DATA,
  SEARCH_FLIGHTS_SUCCESS,
  SEARCH_FLIGHTS_FAILURE,
  DISPLAY_USER_FLIGHTS,
  INSERT_USER_FLIGHTS,
  DELETE_USER_FLIGHTS
} from "./search.types";

const initialState = {
  fromValue: "",
  toValue: "",
  departValue: "",
  returnValue: "",
  flights: [], // Store search results
  error: null,
  userFlights:[],
  insertedFlight:[],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_DATA:
      return {
        ...state,
        fromValue: action.payload.fromValue,
        toValue: action.payload.toValue,
        departValue: action.payload.departValue,
        returnValue: action.payload.returnValue,
      };
    case SEARCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.payload,
        error: null,
      };
    case SEARCH_FLIGHTS_FAILURE:
      return {
        ...state,
        flights: [],
        error: action.payload,
      };
    case DISPLAY_USER_FLIGHTS:
      return {
        ...state,
        userFlights: action.payload
      }
    case INSERT_USER_FLIGHTS:
      return {
        ...state,
        insertedFlight: action.payload
      }
    case DELETE_USER_FLIGHTS:
      return{
        ...state,
        userFlights: action.payload
      }
    default:
      return state;
  }
};

export default searchReducer;
