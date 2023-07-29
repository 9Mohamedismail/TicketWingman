import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_WEATHER_F_THUNK, FETCH_WEATHER_C_THUNK } from "../redux/weather/weather.actions";
import DisplayTemp from "../components/DisplayTemp";
import DisplayWeather from "../components/DisplayWeather";
import { useLocation } from "react-router-dom";

// example of accessing to weather page is shown below
//<Link to = "/weather" state ={{destination:"JFK",startingDate:"2023-09-01",endingDate:"2023-12-30",tempF:true}}>weather</Link>
function Weather() {
    let weather = useSelector((state) => state.weather.weatherTemp);
    const location = useLocation();
    // const {destination,startingDate,endingDate,tempF} = location.state;
    const dispatch = useDispatch();
    let tempF = true;

    //Subtracts the year of the given date and returns the date string with the updated year
    function minusYear(date){
        const targetDate = new Date(date);
        const year = targetDate.getFullYear()-1;
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        // const weatherObject = {
            // locationName: "JFK",
            // date1: minusYear("2023-01-01"),
            // date2: minusYear("2023-12-31")
            // locationName: destination,
            // date1: minusYear(startingDate),
            // date2: minusYear(endingDate)
        // };
        const locationName= "JFK";
        console.log("dispatch: historical weather");
        if(tempF){
            dispatch(FETCH_WEATHER_F_THUNK(locationName));
        }else{
            dispatch(FETCH_WEATHER_C_THUNK(locationName));
        }
    }, [dispatch]);
   
    return (
      <div>
         <DisplayTemp/>
         <DisplayWeather/>
      </div>
    );
}

export default Weather;