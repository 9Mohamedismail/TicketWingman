import React,{useEffect} from "react";
import DisplayFlights from "../components/DisplayFlights";
import { useDispatch, useSelector } from "react-redux";
import { displayUserFlight} from "../redux/flights/search.action";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function UserFlights() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const displayFlights = useSelector((state) => state.search.userFlights);

  useEffect(() => {
    dispatch(displayUserFlight(currentUser.id))
}, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <Button className="btn btn-primary btn-lg">
          <Link
            to="/newFlights"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add new flight
          </Link>
        </Button>
      </div>
      {displayFlights.length!==0?(<DisplayFlights/>):(null)}
    </div>
  );
}

export default UserFlights;
