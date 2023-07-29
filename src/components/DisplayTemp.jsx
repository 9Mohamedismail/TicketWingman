import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale);
const DisplayTemp = () => {
  const weather = useSelector((state) => state.weather.weatherTemp);

  function visualGradient(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradiantSegment = ctx.createLinearGradient(0, bottom, 0, top);
    gradiantSegment.addColorStop(0, "#7cb1b7");
    gradiantSegment.addColorStop(0.5, "#e8c867");
    gradiantSegment.addColorStop(1, "rgb(255, 122, 136)");
    return gradiantSegment;
  }

  return (
    <div style={{ width: 1400 }}>
      {weather.length !== 0 ? (
        <Bar
          data={{
            labels: weather.daily.time.map((data) => data),
            datasets: [
              {
                label: "Average Temperature",
                data: weather.daily.temperature_2m_max.map((data) => data),
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                // backgroundColor: 'rgba(255, 99, 71, 0.8)',
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) {
                    return null;
                  }
                  return visualGradient(chart);
                },
                tension: 0.1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Historical weather From Past Year",
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
                time: {
                  // Luxon format string
                  tooltipFormat: "DD T",
                },
              },
              y: {
                // stacked: true,
                title: {
                  display: true,
                  text: "Temperature",
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
export default DisplayTemp;
