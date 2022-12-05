import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const CoinChart = ({ arr = {}, currencySymbol, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      date.push(
        new Date(arr[i][0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else {
      date.push(new Date(arr[i][0]).toLocaleDateString());
    }
    prices.push(arr[i][1]);
  }
  //   console.log("arr received:", arr);
  return (
    <Line
      options={{ responsive: true }}
      data={{
        labels: date,
        datasets: [
          {
            label: `Price in ${currencySymbol}`,
            data: prices,
            borderColor: "#ce7777",
            backgroundColor: "#961414",
          },
        ],
      }}
    />
  );
};

export default CoinChart;
