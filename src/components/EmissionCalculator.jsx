import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EmissionCalculatorCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, evaluate } from "mathjs";
import {
  faGasPump,
  faCar,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

function EmissionCalculator() {
  const [emission, setEmission] = useState();
  const [phoneEmission, setPhoneEmission] = useState();
  const [mileEmission, setMileEmission] = useState();
  const [gasEmission, setGasEmission] = useState();
  const [showEmissionData, setShowEmissionData] = useState(false);

  const handleConvert = () => {
    const kiloToMetric = evaluate(`${emission} / 1000`);
    if (emission) {
      setShowEmissionData(true);

      setPhoneEmission(
        format(evaluate(`${kiloToMetric} / (8.22 * 10^(-6))`), {
          notation: "fixed",
          precision: 0,
        })
      );
      setMileEmission(
        format(evaluate(`${kiloToMetric} / (3.90 * 10^(-4))`), {
          notation: "fixed",
          precision: 0,
        })
      );
      setGasEmission(
        format(evaluate(`${kiloToMetric} / (8.887 * 10^(-3))`), {
          notation: "fixed",
          precision: 0,
        })
      );
    } else {
      setShowEmissionData(false);
    }
  };

  return (
    <div>
      <div id="emissionField">
        <div className="input-group mb-3 ">
          <input
            type="number"
            id="emissionNumber"
            className="form-control"
            placeholder="Enter CO2 (kg)"
            onChange={(e) => setEmission(e.target.value)}
          />
          <button
            className="btn btn-primary btn-color"
            type="submit"
            id="emissionButton"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>
      {showEmissionData && (
        <div id="emissionContainer">
          <div className="emissionItem-Mobile">
            <FontAwesomeIcon icon={faMobileScreenButton} size="5x" />
            <div className="coInfo-Mobile">
              <h1 className="coEmission">{phoneEmission}</h1>
              <p className="coMessage"> Number of smartphones charged</p>
            </div>
          </div>

          <div className="emissionItem">
            <FontAwesomeIcon icon={faCar} size="5x" />
            <div className="coInfo">
              <h1 className="coEmission">{mileEmission}</h1>
              <p className="coMessage">Average miles driven by a gas car</p>
            </div>
          </div>

          <div className="emissionItem">
            <FontAwesomeIcon icon={faGasPump} size="5x" />
            <div className="coInfo">
              <h1 className="coEmission">{gasEmission}</h1>
              <p className="coMessage">Gallons of gasoline consumed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmissionCalculator;
