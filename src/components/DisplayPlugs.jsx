import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/flightsCard.css"

function DisplayPlugs(props) {
    const foundPlugs = useSelector((state) => state.plugs.plugsType);

    return (
        <div>
            {/* if foundPlugs is empty then display Loading......, if not empty then display the plugs info of given country */}
            {foundPlugs.length !== 0 ? (
                <div>
                    <h4>{props.countryName} uses these plug(s), so make sure to bring them with you when traveling!</h4>
                    {/* shows the types of plugs/socket*/}
                    <div className="flight-container">
                        <div>
                            {/* shows the frequency of plugs/socket*/}
                            {/* shows the voltage of plugs/socket*/}
                            {foundPlugs[0].frequency.hertz.map((data, i) => {
                                return (
                                    <div key={i}>
                                        <p>Frequency: {data}{foundPlugs[0].frequency.unit}</p>
                                    </div>
                                );
                            })}
                            {foundPlugs[0].voltage.volt.map((data, i) => {
                                return (
                                    <div key={i}>
                                        <p>Voltage: {data}V</p>
                                    </div>
                                );
                            })}
                        </div>
                        {foundPlugs[0].plugs.map((data, i) => {
                            return (
                                <div key={i} >
                                    <h3>Type: {data.type}</h3>
                                    <img style={{ width: 50, height: 100, marginLeft: 10 }} src={data.img}></img>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <h1>Loading......</h1>
            )}
        </div>
    );
}

export default DisplayPlugs;