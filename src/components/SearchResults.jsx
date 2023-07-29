import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FETCH_WEATHER_F_THUNK,
  FETCH_WEATHER_C_THUNK,
} from "../redux/weather/weather.actions";
import DisplayTemp from "./DisplayTemp";
import DisplayWeather from "./DisplayWeather";
import EmissionCalculator from "./EmissionCalculator";
import "../css/SearchResults.css";
import { FETCH_PLUGS_TYPE_THUNK } from "../redux/plugs/plugs.actions";
import DisplayPlugs from "./DisplayPlugs";

const SearchResults = () => {
  // console.log("Render Search Results page");
  const location = useLocation();
  const dispatch = useDispatch();
  const dataMart = location.state && location.state.data; //Returned data
  const countryData = dataMart && dataMart.countryData; // Country's data
  const data = dataMart && dataMart.travelAdvisoryData; // Flights' data
  const countryCode = countryData.api_status.request.item.toUpperCase(); //Get data from the api. In the curly braces, and then convert it to uppercase letter.
  console.log("Country's data" + JSON.stringify(countryCode));
  console.log("Flight's data" + JSON.stringify(data));
  const [expandedFlightIndex, setExpandedFlightIndex] = useState(-1);

  const [selectedCabin, setSelectedCabin] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStopovers, setSelectedStopovers] = useState("");
  const [selectedEmissions, setSelectedEmissions] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [tempF, setTempF] = useState(true);
  const [expandedFlightIndices, setExpandedFlightIndices] = useState([]);

  useEffect(() => {
    console.log(tempF);
    dispatch(FETCH_WEATHER_F_THUNK(location.state.targetLocation));
    dispatch(FETCH_PLUGS_TYPE_THUNK(countryCode));
  }, [dispatch]);

  useEffect(() => {
    // Initialize the expandedFlightIndices array with false for each flight
    if (data && Array.isArray(data)) {
      setExpandedFlightIndices(new Array(data.length).fill(false));
    }
  }, [data]);

  const changeScale = () => {
    if (tempF) {
      dispatch(FETCH_WEATHER_C_THUNK(location.state.targetLocation));
      setTempF(false);
    } else {
      dispatch(FETCH_WEATHER_F_THUNK(location.state.targetLocation));
      setTempF(true);
    }
  };

  // Check if data exists and if it is an array
  if (!data || !Array.isArray(data)) {
    return <p>No data</p>;
  }

  const filteredData = data.filter((flight) => {
    // Filter based on flight cabin
    if (
      selectedCabin &&
      !flight.tickets.departure_ticket.some(
        (ticket) => ticket.cabin === selectedCabin
      )
    ) {
      return false;
    }

    // Filter based on price
    if (selectedPrice) {
      const price = parseFloat(flight.total_price.total);
      if (selectedPrice === "100-below" && price >= 100) {
        return false;
      } else if (selectedPrice === "100-200" && (price < 100 || price >= 200)) {
        return false;
      } else if (selectedPrice === "200-300" && (price < 200 || price >= 300)) {
        return false;
      } else if (selectedPrice === "300-600" && (price < 300 || price >= 600)) {
        return false;
      } else if (
        selectedPrice === "600-1000" &&
        (price < 600 || price >= 1000)
      ) {
        return false;
      } else if (
        selectedPrice === "1000-1500" &&
        (price < 1000 || price >= 1500)
      ) {
        return false;
      } else if (selectedPrice === "1500-above" && price < 1500) {
        return false;
      }
    }

    // Filter based on number of stops
    if (selectedStopovers === "direct") {
      // non stop flight
      if (flight.tickets.departure_ticket.length > 1) {
        return false;
      }
    } else if (selectedStopovers === "1-stop") {
      // flight that stop once
      if (flight.tickets.departure_ticket.length <= 1) {
        return false;
      }
    } else if (selectedStopovers === "2-stops") {
      // flight that stop twice
      if (flight.tickets.departure_ticket.length <= 2) {
        return false;
      }
    }

    // Filter based on CO2 emission
    if (selectedEmissions) {
      const emissions = parseFloat(selectedEmissions);
      const totalEmissionsInGrams = flight.tickets.departure_ticket.reduce(
        (accumulator, ticket) =>
          accumulator + parseFloat(ticket.emissions || 0),
        0
      );
      const totalEmissionsInKilograms = totalEmissionsInGrams / 1000; // Convert gram to kilogram
      if (totalEmissionsInKilograms > emissions) {
        return false;
      }
    }

    // Filter based on total departure duration
    if (selectedDuration) {
      const duration = parseFloat(selectedDuration);
      if (duration > 0) {
        const totalDepartureDuration = parseFloat(
          flight.total_departure_duration
        );
        if (totalDepartureDuration > duration) {
          return false;
        }
      }
    }

    return true;
  });

  // Create a separate state for each flight ticket to see whether it is expanded or not.
  // The state is an array of booleans.
  const toggleFlightInfo = (index) => {
    setExpandedFlightIndices((prevIndices) => {
      const updatedIndices = [...prevIndices];
      updatedIndices[index] = !updatedIndices[index];
      return updatedIndices;
    });
  };

  const extractDateTime = (dateTime) => {
    const time = new Date(dateTime);
    return time.toLocaleString();
  };

  const calculateTotalEmissions = (flight) => {
    const hasUnknownEmissions = flight.tickets.departure_ticket.some(
      (ticket) => parseFloat(ticket.emissions) === -1
    );

    if (hasUnknownEmissions) {
      return "unknown";
    }

    const totalEmissionsInGrams = flight.tickets.departure_ticket.reduce(
      (accumulator, ticket) => {
        return accumulator + parseFloat(ticket.emissions || 0);
      },
      0
    );

    const totalEmissionsInKilograms = totalEmissionsInGrams / 1000; // Convert gram to kilogram
    return totalEmissionsInKilograms.toFixed(2); // Preserve two decimal places
  };

  const calculateLayoverTime = (flight) => {
    const departureTickets = flight.tickets.departure_ticket;
    const layoverStations = departureTickets.length - 1;

    if (layoverStations === 0) {
      // Non-stop flight does not have layover time
      return "Non-stop";
    } else {
      // Calculate layover time
      let layoverTimeMinutes = 0;
      for (let i = 0; i < layoverStations; i++) {
        const currentTicket = departureTickets[i];
        const nextTicket = departureTickets[i + 1];
        const currentArrivalTime = new Date(currentTicket.arrival.time);
        const nextDepartureTime = new Date(nextTicket.departure.time);
        layoverTimeMinutes +=
          (nextDepartureTime - currentArrivalTime) / (1000 * 60);
      }

      if (layoverTimeMinutes < 0) {
        // Prevent the appearance of negative time result
        return "non-stop";
      } else {
        const layoverHours = Math.floor(layoverTimeMinutes / 60);
        const layoverMinutes = layoverTimeMinutes % 60;
        const layoverInfo =
          layoverStations > 1 ? `(${layoverStations} stops)` : "";
        return `${layoverHours}H${layoverMinutes}M ${layoverInfo}`;
      }
    }
  };

  return (
    <div>
      <div className="dropdown-menu-container">
        {/* This div contains all the droppdown menu, group them together, and align them in the center */}
        <div className="select-container">
          <select
            id="cabinSelect"
            value={selectedCabin}
            onChange={(e) => setSelectedCabin(e.target.value)}
          >
            <option value="">Cabins</option>
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="FIRST">First</option>
          </select>
        </div>
        <div className="select-container">
          <select
            id="stopoversSelect"
            value={selectedStopovers}
            onChange={(e) => setSelectedStopovers(e.target.value)}
          >
            <option value="">Stops</option>
            <option value="direct">Non-stop</option>
            <option value="1-stop">One stop</option>
            <option value="2-stops">Two stop</option>
          </select>
        </div>
        <div className="select-container">
          <select
            id="emissionsSelect"
            value={selectedEmissions}
            onChange={(e) => setSelectedEmissions(e.target.value)}
          >
            <option value="">Emissions</option>
            <option value="100">100kg and below</option>
            <option value="200">200kg and below</option>
            <option value="500">500kg and below</option>
            <option value="1000">1000kg and below</option>
          </select>
        </div>
        <div className="select-container">
          <select
            id="durationSelect"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="">Departure duration</option>
            <option value="2">2hr and below</option>
            <option value="4">4hr and below</option>
            <option value="6">6hr and below</option>
            <option value="8">8hr and below</option>
          </select>
        </div>
        <div className="select-container">
          <select
            id="priceSelect"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Price</option>
            <option value="100-below">100 and below</option>
            <option value="100-200">100 - 200</option>
            <option value="200-300">200 - 300</option>
            <option value="300-600">300 - 600</option>
            <option value="600-1000">600 - 1000</option>
            <option value="1000-1500">1000 - 1500</option>
            <option value="1500-above">1500 and above</option>
          </select>
        </div>

        {/* This div contains travel advisory info from travel advisory api */}
        <div>
          <div className="advisory-container">
            <h3>
              Travel Advisory: {dataMart && countryData.data[countryCode].name}
            </h3>
            <div>
              <p>
                <strong>Risk level:</strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.score}
              </p>
              <p>
                <strong>Risk level description:</strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.message}
              </p>
              <p>
                <strong>Advisories found:</strong>{" "}
                {dataMart &&
                  countryData.data[countryCode].advisory.sources_active}
              </p>
              <p>
                <strong>Updated time:</strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.updated}
              </p>
              <p>
                <strong>For more information, visit:</strong>{" "}
                <a
                  href={
                    dataMart && countryData.data[countryCode].advisory.source
                  }
                  target="_blank"
                >
                  {dataMart && countryData.data[countryCode].advisory.source}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* This component will display the plugs types based on the country of current search result */}
          <DisplayPlugs countryName={dataMart && countryData.data[countryCode].name}/>
        </div>

        {/* This div is for temperature chartJs diagram */}
        <div>
          <div className="temperature-display-container">
            <div className="temperature-inner-container">
              <button onClick={changeScale} className="temperature-button">
                {tempF ? "Convert to Celsius" : "Convert to Fahrenheit"}
              </button>
              <DisplayTemp />
              <br />
              <DisplayWeather />
            </div>
          </div>
        </div>
        <br />

        {/* This div group emission calculator and all the flight tickets together */}
        <div className="calculator-flights-container">
          {/* Emission calculator */}
          <div className="emission-calculator-container">
            <h5>Emission Calculator</h5>
            <EmissionCalculator />
          </div>

          {/* All flight tickets */}
          <div className="flight-tickets-container">
            <h5>Flights Tickets</h5>
            {filteredData.map((flight, index) => (
              <div
                key={index}
                className="flight-ticket"
                onClick={() => toggleFlightInfo(index)}
              >
                <div className="flight-ticket-info">
                  <div className="from-to-container">
                    <span className="from-to">
                      {flight.tickets.departure_ticket.length > 1
                        ? `From: ${extractDateTime(
                            flight.tickets.departure_ticket[0].departure.time
                          )}`
                        : `From: ${extractDateTime(
                            flight.tickets.departure_ticket[0].departure.time
                          )}`}
                    </span>
                    <span className="from-to">
                      {flight.tickets.departure_ticket.length > 1
                        ? `To: ${extractDateTime(
                            flight.tickets.departure_ticket[
                              flight.tickets.departure_ticket.length - 1
                            ].arrival.time
                          )}`
                        : `To: ${extractDateTime(
                            flight.tickets.departure_ticket[0].arrival.time
                          )}`}
                    </span>
                  </div>
                  <span>
                    Departure Duration: {flight.total_departure_duration}
                  </span>
                  <span>Emission: {calculateTotalEmissions(flight)} kg</span>
                  <span>Layover: {calculateLayoverTime(flight)}</span>
                  <span>
                    Price: {flight.total_price.total}{" "}
                    {flight.total_price.currency}
                  </span>
                  <button className="flight-ticket-button">
                    {expandedFlightIndices[index] ? "▲" : "▼"}
                  </button>
                </div>

                {/* Display departure ticket info */}
                {flight.tickets.departure_ticket.map((ticket, i) => (
                  <div
                    key={i}
                    className={`departure-ticket-container ${
                      expandedFlightIndices[index] ? "show" : ""
                    }`}
                  >
                    <h3>Flight {i + 1}</h3>
                    <p>Departure airport: {ticket.departure.iataCode}</p>
                    <p>
                      Departure time: {extractDateTime(ticket.departure.time)}
                    </p>
                    <p>Arrival airport: {ticket.arrival.iataCode}</p>
                    <p>Arrival time: {extractDateTime(ticket.arrival.time)}</p>
                    <p>Flight number: {ticket.flight_number}</p>
                    <p>Duration: {ticket.duration}</p>
                    <p>Cabin: {ticket.cabin}</p>
                    {parseFloat(ticket.emissions) === -1 ? (
                      <p>Emission: unknown</p>
                    ) : (
                      <p>
                        Carbon dioxide emission:{" "}
                        {(parseFloat(ticket.emissions) / 1000).toFixed(2)} kg
                      </p>
                    )}
                    <p>
                      Number of stops:{" "}
                      {i === flight.tickets.departure_ticket.length - 1
                        ? "Non-stop"
                        : `${i + 1}`}
                    </p>
                  </div>
                ))}

                {/* Add divider: Display return ticket info */}
                {expandedFlightIndices[index] &&
                  flight.tickets.return_ticket &&
                  flight.tickets.return_ticket.length > 0 && (
                    <div className="return-ticket-divider">
                      <h3>Return flight info</h3>
                      {flight.tickets.return_ticket.map((ticket, i) => (
                        <div key={i} className="return-ticket-container">
                          <h3>Flight {i + 1}</h3>
                          <p>Departure airport: {ticket.departure.iataCode}</p>
                          <p>
                            Departure time:{" "}
                            {extractDateTime(ticket.departure.time)}
                          </p>
                          <p>Arrival airport: {ticket.arrival.iataCode}</p>
                          <p>
                            Arrival time: {extractDateTime(ticket.arrival.time)}
                          </p>
                          <p>Flight number: {ticket.flight_number}</p>
                          <p>Duration: {ticket.duration}</p>
                          <p>Cabin: {ticket.cabin}</p>
                          {parseFloat(ticket.emissions) === -1 ? (
                            <p>Emission: unknown</p>
                          ) : (
                            <p>
                              Carbon dioxide emission:{" "}
                              {(parseFloat(ticket.emissions) / 1000).toFixed(2)}{" "}
                              kg
                            </p>
                          )}
                          <p>
                            Number of stops:{" "}
                            {i === flight.tickets.return_ticket.length - 1
                              ? "Non-stop"
                              : `${i + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                {expandedFlightIndices[index] && flight.total_price && (
                  <p>
                    Price: {flight.total_price.total}{" "}
                    {flight.total_price.currency}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
