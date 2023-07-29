import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import "../css/FlightCard.css";

function FlightCard({ flightData }) {
  const { flight, airline, departure, arrival, flight_status, flight_date } =
    flightData;

  const getStatusClass = () => {
    switch (flight_status) {
      case "scheduled":
        return "scheduledFlight";
      case "active":
        return "activeFlight";
      case "landed":
        return "landedFlight";
      default:
        return "";
    }
  };

  return (
    <div id="flightDataContainer">
      <div id="flightDataHeading">
        <div className="flightNumber">
          <h1>{flight.iata}</h1>
          <p>
            {airline.name} ({airline.iata})
          </p>
        </div>
        <div className="flightInfo">
          <h1>{departure.iata}</h1>
        </div>
        <div className="flightIcon">
          <FontAwesomeIcon icon={faPlane} size="5x" />
        </div>
        <div className="flightInfo">
          <h1>{arrival.iata}</h1>
        </div>
        <div className={`flightStatus ${getStatusClass()}`}>
          <h1>{flight_status}</h1>
        </div>
      </div>
      <div className="timeContainers">
        <div id="DepartureContainer">
          <div className="airportInfo">
            <p>{departure.airport}</p>
            <p className="smallerTextMargins">Flight Departure Times</p>
            <p className="smallerTextMargins">{flight_date}</p>
            <p>Timezone: {departure.timezone}</p>
          </div>
          <div className="airportTimeInfo">
            <div className="scheduledTimeContainer">
              <p className={`scheduleText smallerTextMargins`}>Scheduled</p>
              <p className={`scheduleTime smallerTextMargins`}>
                {departure.scheduled?.slice(11, 16)}
              </p>
              <p className={`estimateTime smallerTextMargins`}>
                (Estimated: {departure.estimated?.slice(11, 16)})
              </p>
            </div>
            <div className="arrivalTime">
              <p className={`scheduleText smallerTextMargins`}>Actual</p>
              <p className={`scheduleTime smallerTextMargins`}>
                {departure.actual ? departure.actual.slice(11, 16) : "---"}
              </p>
              <p className={`estimateTime smallerTextMargins`}>
                (Actual Runway:{" "}
                {departure.actual_runway
                  ? departure.actual_runway.slice(11, 16)
                  : "---"}
                )
              </p>
            </div>
          </div>
          <table className="infoTable">
            <thead>
              <tr>
                <th>Terminal</th>
                <th>Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{departure.terminal}</td>
                <td>{departure.gate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="ArrivalContainer">
          <div className="airportInfo">
            <p>{arrival.airport}</p>
            <p className="smallerTextMargins">Flight Arrival Times</p>
            <p className="smallerTextMargins">{flight_date}</p>
            <p>Timezone: {arrival.timezone}</p>
          </div>
          <div className="airportTimeInfo">
            <div className="scheduledTimeContainer">
              <p className={`scheduleText smallerTextMargins`}>Scheduled</p>
              <p className={`scheduleTime smallerTextMargins`}>
                {arrival.scheduled?.slice(11, 16)}
              </p>
              <p className={`estimateTime smallerTextMargins`}>
                (Estimated: {arrival.estimated?.slice(11, 16)})
              </p>
            </div>
            <div className="arrivalTime">
              <p className={`scheduleText smallerTextMargins`}>Actual</p>
              <p className={`scheduleTime smallerTextMargins`}>
                {arrival.actual ? arrival.actual.slice(11, 16) : "---"}
              </p>
              <p className={`estimateTime smallerTextMargins`}>
                (Actual Runway:{" "}
                {arrival.actual_runway
                  ? arrival.actual_runway.slice(11, 16)
                  : "---"}
                )
              </p>
            </div>
          </div>
          <table className="infoTable">
            <thead>
              <tr>
                <th>Terminal</th>
                <th>Gate</th>
                <th>Baggage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{arrival.terminal ? arrival.terminal : "---"}</td>
                <td>{arrival.gate ? arrival.gate : "---"}</td>
                <td>{arrival.baggage ? arrival.baggage : "---"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
