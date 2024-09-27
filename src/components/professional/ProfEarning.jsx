import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from Chart.js
import getProfessionalIdFromToken from "../../utils/getProfId";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfEarning = () => {
  const [professionalId, setProfessionalId] = useState(null); // State to hold profId
  const [earningsData, setEarningsData] = useState(null); // State to hold earnings data
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchEarningsData = async () => {
      const id = await getProfessionalIdFromToken();
      setProfessionalId(id);

      if (id) {
        try {
          const response = await fetch(
            `http://localhost:8081/booking/professional/${id}/earnings`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("API Response Data:", data);
          setEarningsData(data);
        } catch (error) {
          console.error("Error fetching earnings data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEarningsData(); // Fetch earnings data only if profId is available
  }, [professionalId]); // Dependency array includes profId

  // Show loading message while data is being fetched
  if (loading) return <p className="text-center text-xl">Loading...</p>;

  // Handle case where no earnings data is available
  if (!earningsData || Object.keys(earningsData).length === 0) {
    return <p className="text-center text-xl">No earnings data available</p>; // Display message if no data
  }

  // Prepare data for the chart
  const dates = Object.keys(earningsData); // Extract dates from earnings data
  const earnings = Object.values(earningsData); // Extract earnings values

  // Log the extracted dates and earnings
  console.log("Extracted Dates:", dates);
  console.log("Extracted Earnings:", earnings);

  // Configure chart data
  const data = {
    labels: dates, // Set X-axis labels to dates
    datasets: [
      {
        label: "Earnings (€)", // Label for the dataset
        data: earnings, // Set Y-axis data to earnings
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true, // Make chart responsive
    plugins: {
      legend: {
        position: "top", // Position legend at the top
      },
      title: {
        display: true, // Show title
        text: "Professional Earnings by Date", // Title text
      },
    },
  };

  // Render the chart
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Earnings Overview</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <Bar data={data} options={options} /> {/* Render Bar chart */}
      </div>
    </div>
  );
};

export default ProfEarning; // Export the component
