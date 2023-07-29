import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayUserFlight, deleteUserFlight } from "../redux/flights/search.action";
import "../css/flightsCard.css"
// import { Link } from "react-router-dom";
// import Weather from "../pages/Weather"
const DisplayFlights = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const displayFlights = useSelector((state) => state.search.userFlights);
    // useEffect(() => {
    //     dispatch(displayUserFlight(currentUser.id))
    // }, []);

    const convertTime = (dateTime) => {
        return dateTime.slice(0, 16).replace("T", " ");
    };

    const deleteFlight = (id) => {
        dispatch(deleteUserFlight(id, currentUser.id))
    }
    console.log(displayFlights);
    return (
        <Row xs={1} md={4} className="g-4">
            {displayFlights.map((data, i) => {
                return (
                    <Row xs={1} md={4} className="g-4">
                    <div className="flight-container">
                        {displayFlights.map((data, i) => {
                            return (
                                <Col>
                                    <Card key={i} className="flight-card" >
                                        <Card.Body>
                                            <Card.Title class='Airline'>Airline : {data.carrier_code}&nbsp;{data.flight_number}</Card.Title>
                                        </Card.Body>
                                        <Card.Text>
                                            <p>From: {data.departure_location}</p>
                                            <p>Departure Date: {convertTime(data.departure_date)}</p>
                                            <p>To: {data.arrival_location}</p>
                                            <p>Arrival Date: {convertTime(data.arrival_date)}</p>
                                        </Card.Text>
                                        <hr />
                                        <Button onClick={() => deleteFlight(data.id)}>X</Button>
                                    </Card>
                                </Col>
                            );
                        })}
                    </div>
                    </Row>
                );
            })}
        </Row>
    )
}

export default DisplayFlights;
