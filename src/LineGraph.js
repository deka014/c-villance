import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {},
        },
      },
    ],
  },
};
const buildChartData = (data, casesType) => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  const lineData = async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    );
    const data = await response.json();
    // console.log(data);
    const chartData = buildChartData(data, casesType);
    console.log(chartData);
    setData(chartData);
  };

  useEffect(() => {
    lineData();
  }, [casesType]);

  return (
    <div>
      {data.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "red",
                data: data,
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
}

export default LineGraph;
