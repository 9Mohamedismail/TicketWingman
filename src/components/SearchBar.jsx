import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSearchData,
  searchFlights,
} from "../redux/flights/search.action";
import "../css/SearchBarCSS.css";
import Search from "../assets/search.png";
import { addDays, format } from "date-fns"; // Use npm install date-fns to import this package from npm
import LoadingPage from "../components/LoadingPage";

const SearchBar = (props) => {
  const navigate = useNavigate();
  // Use useState to define data
  // Use useState to define data
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [departValue, setDepartValue] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [returnValue, setReturnValue] = useState("");
  const [type, setType] = useState("One-way"); // Add the state of type. The default will be one-way
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // A hook that tracks if the user searched their input

  const handleChangeFrom = (e) => {
    const inputValue = e.target.value.toUpperCase(); // If user input is lowercase, convert it to uppercase
    setFromValue(inputValue);
  };

  const handleChangeTo = (e) => {
    const inputValue = e.target.value.toUpperCase(); // If user input is lowercase, convert it to uppercase
    setToValue(inputValue);
  };

  const handleSubmit = async () => {
    if (fromValue === "") {
      alert("Please fill in the departure airport.");
      return;
    }
    if (toValue === "") {
      alert("Please fill in the arrival airport.");
      return;
    }
    if (type === "Roundtrip" && returnValue === "") {
      alert("Please select the return date for Roundtrip.");
      return;
    }
    setHasSearched(true);
    setLoading(true);

    const requestData = {
      originLocationCode: fromValue,
      destinationLocationCode: toValue,
      departureDate: departValue,
      adults: 1,
    };
    if (returnValue && type === "Roundtrip") {
      requestData.returnDate = returnValue;
    }

    try {
      await props.searchFlights(requestData);
      setLoading(false); // Hide the loading page after the API call is completed
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false); // Hide the loading page if there's an error
    }
  };

  useEffect(() => {
    // Output new data in the console for testing
    console.log("Click on search button then transport data", props.flights);
    console.log("Click on search button then transport data", props.flights);

    // Wait for Redux update data, then redirect to new page
    if (
      hasSearched &&
      props.flights &&
      props.flights.countryData &&
      props.flights.travelAdvisoryData
    ) {
      console.log("Directed successfully to search result page");
      navigate("/SearchResults", {
        state: { data: props.flights, targetLocation: toValue },
      });
    } else {
      console.log("Directed unsuccessfully");
    }
  }, [hasSearched, props.flights, navigate]);

  useEffect(() => {
    // When flight type or trip type changes, return date value changes
    if (type === "One-way") {
      setReturnValue(""); // Clear return date value
    }
  }, [type]);

  return (
    <div className="search-bar">
      <div>
        <label>From</label>
        <input
          type="text"
          placeholder="Airport"
          className="inputField"
          value={fromValue}
          onChange={handleChangeFrom} // Update fromValue
          required
        />
      </div>
      <div>
        <label>To</label>
        <input
          type="text"
          placeholder="Airport"
          className="inputField"
          value={toValue}
          onChange={handleChangeTo} // Update toValue
          required
        />
      </div>
      <div>
        <label>Depart</label>
        <input
          type="date"
          className="inputField"
          value={departValue}
          onChange={(e) => setDepartValue(e.target.value)} // Update departValue
          required
        />
      </div>
      <div>
        <label>Return</label>
        <input
          type="date"
          className="inputField"
          value={returnValue}
          onChange={(e) => setReturnValue(e.target.value)}
          required={type === "Roundtrip"} // When the trip or flight type is Roundtrip, return value will be required
        />
      </div>
      <div>
        <label>Type</label>
        <select
          value={type} // Assign the currently selected type, or one-way
          onChange={(e) => setType(e.target.value)} // Update the state of type
        >
          <option value="One-way">One-way</option>
          <option value="Roundtrip">Roundtrip</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>
        <img src={Search} alt="" />
      </button>
      {loading && <LoadingPage />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  flights: state.search.flights,
});

const mapDispatchToProps = {
  updateSearchData,
  searchFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
