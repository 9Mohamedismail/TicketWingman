import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FETCH_WEATHER_F_THUNK, FETCH_WEATHER_C_THUNK } from "../redux/weather/weather.actions";
import DisplayTemp from "./DisplayTemp";
import DisplayWeather from "./DisplayWeather";

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

  useEffect(() => {
    var tempF = true;
    if(tempF){
        dispatch(FETCH_WEATHER_F_THUNK(location.state.targetLocation));
    }else{
        dispatch(FETCH_WEATHER_C_THUNK(location.state.targetLocation));
    }
}, [dispatch]);

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

  const toggleFlightInfo = (index) => {
    setExpandedFlightIndex((prevIndex) => (prevIndex === index ? -1 : index));
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
      <div
        style={{ textAlign: "center", marginBottom: "20px", padding: "20px" }}
      >
        <div style={{ display: "inline-block", marginRight: "20px" }}>
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
        <div style={{ display: "inline-block", marginRight: "20px" }}>
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
        <div style={{ display: "inline-block", marginRight: "20px" }}>
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
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <select
            id="durationSelect"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="">Total departure duration</option>
            <option value="2">2hr and below</option>
            <option value="4">4hr and below</option>
            <option value="6">6hr and below</option>
            <option value="8">8hr and below</option>
          </select>
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
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
        <div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>
              Travel Advisory: {dataMart && countryData.data[countryCode].name}
            </h3>
            <div>
              <p style={{ marginBottom: "2.5px" }}>
                <strong style={{ fontWeight: 600 }}>Risk level:</strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.score}
              </p>
              <p style={{ marginBottom: "2.5px" }}>
                <strong style={{ fontWeight: 600 }}>
                  Risk level description:
                </strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.message}
              </p>
              <p style={{ marginBottom: "2.5px" }}>
                <strong style={{ fontWeight: 600 }}>Advisories found:</strong>{" "}
                {dataMart &&
                  countryData.data[countryCode].advisory.sources_active}
              </p>
              <p style={{ marginBottom: "2.5px" }}>
                <strong style={{ fontWeight: 600 }}>Updated time:</strong>{" "}
                {dataMart && countryData.data[countryCode].advisory.updated}
              </p>

              <p style={{ marginBottom: "2.5px" }}>
                <strong style={{ fontWeight: 600 }}>
                  For more information, visit:
                </strong>{" "}
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
        <DisplayTemp/>
        <DisplayWeather/>
        <div>
          {filteredData.map((flight, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => toggleFlightInfo(index)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ flex: "1" }}>
                  {flight.tickets.departure_ticket.length > 1
                    ? `From: ${extractDateTime(
                        flight.tickets.departure_ticket[0].departure.time
                      )} To: ${extractDateTime(
                        flight.tickets.departure_ticket[
                          flight.tickets.departure_ticket.length - 1
                        ].arrival.time
                      )}`
                    : `From: ${extractDateTime(
                        flight.tickets.departure_ticket[0].departure.time
                      )} To: ${extractDateTime(
                        flight.tickets.departure_ticket[0].arrival.time
                      )}`}
                </span>
                <span style={{ flex: "1" }}>
                  Departure Duration: {flight.total_departure_duration}
                </span>
                <span style={{ flex: "1" }}>
                  Total emission: {calculateTotalEmissions(flight)} kg
                </span>
                <span style={{ flex: "1" }}>
                  Layover time: {calculateLayoverTime(flight)}
                </span>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {expandedFlightIndex === index ? "▲" : "▼"}
                </button>
              </div>

              {flight.tickets.departure_ticket.map((ticket, i) => (
                <div
                  key={i}
                  style={{
                    display: expandedFlightIndex === index ? "block" : "none",
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
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

              {/* Add divider: To display return ticker info */}
              {expandedFlightIndex === index &&
                flight.tickets.return_ticket &&
                flight.tickets.return_ticket.length > 0 && (
                  <div
                    style={{
                      borderTop: "1px solid #ccc",
                      marginTop: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <h3>Return flight info</h3>
                    {flight.tickets.return_ticket.map((ticket, i) => (
                      <div
                        key={i}
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
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

              {expandedFlightIndex === index && flight.total_price && (
                <p>
                  Price:{flight.total_price.total} {flight.total_price.currency}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
