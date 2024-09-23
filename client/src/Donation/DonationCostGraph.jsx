import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DonationCostGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Donations",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Costs",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/report/totals/donations`
        );
        const donationResult = await donationResponse.json();

        const donationLabels = donationResult.donations.map(
          (item) => item.date
        );
        const donationAmounts = donationResult.donations.map(
          (item) => item.total_donations
        );

        const costResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/report/totals/costs`
        );
        const costResult = await costResponse.json();

        const costAmounts = costResult.costs.map((item) => item.total_costs);

        setChartData((prevData) => ({
          ...prevData,
          labels: donationLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: donationAmounts,
            },
            {
              ...prevData.datasets[1],
              data: costAmounts,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "700px", height: "600px" }} className="mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Daily Donation and Cost Overview
      </h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default DonationCostGraph;
