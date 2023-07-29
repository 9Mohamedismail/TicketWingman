import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
Chart.register(CategoryScale);
const DisplayWeather = () => {
  const weather = useSelector((state) => state.weather.weatherTemp);

  return (
    <div style={{ width: 1400 }}>
      {weather.length !== 0 ? (
        <Line
          data={{
            labels: weather.daily.time.map((data) => data),
            datasets: [
              {
                label: "Rain Sum",
                data: weather.daily.rain_sum.map((data) => data / 10),
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                // backgroundColor: 'rgba(255, 99, 71, 0.8)',
                backgroundColor: "blue",
                tension: 0.1,
              },
              {
                label: "Snowfall Sum",
                data: weather.daily.snowfall_sum.map((data) => data),
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                // backgroundColor: 'rgba(255, 99, 71, 0.8)',
                backgroundColor: "pink",
                tension: 0.1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Historical Rain and Snowfall Sum From Past Year",
              },
              legend: {
                display: false,
              },
            },
            animations: {
              tension: {
                duration: 1000,
                easing: "linear",
                from: 1,
                to: 0,
                loop: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Day",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
              },
              y: {
                // stacked: true,
                title: {
                  display: true,
                  text: "Centimeter",
                  font: {
                    family: "Times",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
              },
            },
          }}
          width={600}
          height={400}
        />
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};
export default DisplayWeather;
