import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_FLIGHT_THUNK } from "../redux/track/track.actions";
import "../css/TrackFlight.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FlightCard from "../components/FlightCard";

function TrackFlight() {
  const flight = useSelector((state) => state.track.flightData);
  const dispatch = useDispatch();
  const [flightNumber, setFlightNumber] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (evt) => {
    setFlightNumber(evt.target.value);
  };

  const handleSubmit = () => {
    if (flightNumber) {
      const flightObject = {
        flight_iata: flightNumber,
      };
      dispatch(FETCH_FLIGHT_THUNK(flightObject));
      setSubmitted(true);
    }
  };

  const handleNewSearch = () => {
    setSubmitted(false);
    setFlightNumber("");
  };

  return (
    <div id="Container">
      {!submitted && (
        <div id="trackFlightContainer">
          <h1 id="trackFlightHeading">Have a Flight?</h1>
          <p id="trackFlightMessage">
            Enter Your Flight Number Below for Departure and Arrival
            Information, Weather Updates, and Travel Advisory Data!
          </p>
          <div className="input-group mb-3 input-group-lg">
            <span className="input-group-text" id="trackIcon">
              <i className="bi bi-airplane"></i>
            </span>
            <input
              type="text"
              name="flightNumber"
              id="flightNumber"
              className="form-control"
              placeholder="Flight Number (e.g. UA2220)"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              id="flightSearchButton"
              className="btn btn-secondary btn-lg"
              onClick={handleSubmit}
            >
              SEARCH FLIGHT
            </button>
          </div>
        </div>
      )}
      <div>
        {submitted && flight ? (
          <FlightCard flightData={flight.data[0]} />
        ) : null}
      </div>
      <div id="searchButtonTrack">
        {submitted && ( // Show the button only if the form is submitted
          <button
            type="button"
            id="newSearchButton"
            className="btn btn-primary btn-lg"
            onClick={handleNewSearch}
          >
            NEW SEARCH?
          </button>
        )}
      </div>
    </div>
  );
}

export default TrackFlight;
