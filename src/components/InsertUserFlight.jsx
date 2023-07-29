import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertUserFlight } from "../redux/flights/search.action";

function InsertUserFlight() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const insertFlight = () => {
    const ccode = document.getElementById("carrierCode").value.toUpperCase();
    const fnumber = document.getElementById("flightNumber").value;
    const departureDate = document.getElementById("departureDate").value;
    const cabin = document.getElementById("cabin").value.toLowerCase();
    const email = currentUser.email;

    dispatch(insertUserFlight(email, ccode, fnumber, departureDate, cabin));

    navigate("/");
  };

  const back = () => {
    navigate("/userflights");
  };

  return (
    <center>
      <div id="flight_insert_contents">
        <h1>Add Flight Page</h1>
        <br />
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text>Carrier Code : </InputGroup.Text>
            <Form.Control
              class="inputcontents"
              id="carrierCode"
              type="text"
              placeholder="Carrier Code of the flight (ex:  CX)"
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Flight Number : </InputGroup.Text>
            <Form.Control
              class="inputcontents"
              id="flightNumber"
              type="text"
              placeholder="Flight Number of the flight (ex:  840)"
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Scheduled Departure Date : </InputGroup.Text>
            <Form.Control
              class="inputcontents"
              id="departureDate"
              type="text"
              placeholder="Departure Date of the flight (ex: YYYY-DD-MM) "
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Cabin : </InputGroup.Text>
            <Form.Select id="cabin" required>
              <option>.....</option>
              <option> ECONOMY </option>
              <option> PREMIUM_ECONOMY </option>
              <option> BUSINESS </option>
              <option> FRIST </option>
            </Form.Select>
          </InputGroup>
        </Form>
        <br />
        <Button onClick={back}>Back</Button>
        &nbsp;
        <Button onClick={insertFlight}>Insert</Button>
      </div>
    </center>
  );
}

export default InsertUserFlight;
