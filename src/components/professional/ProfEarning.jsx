// Import necessary libraries and components
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
  const [timeFrame, setTimeFrame] = useState("weekly"); // State to manage the selected time frame

  useEffect(() => {
    const fetchEarningsData = async () => {
      const id = await getProfessionalIdFromToken();
      setProfessionalId(id);

      if (id) {
        try {
          const response = await fetch(
            `https://backend-taskmate.onrender.com/booking/professional/${id}/earnings?timeFrame=${timeFrame}`
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
  }, [professionalId, timeFrame]); // Dependency array includes profId and timeFrame

  // Show loading message while data is being fetched
  if (loading) return <p className="text-center text-xl">Loading...</p>;

  // Handle case where no earnings data is available
  if (!earningsData || Object.keys(earningsData).length === 0) {
    return <p className="text-center text-xl">No earnings data available</p>; // Display message if no data
  }

  // Prepare data for the chart
  const dates = Object.keys(earningsData); // Extract dates from earnings data
  const earnings = Object.values(earningsData); // Extract earnings values

  // Combine and sort dates and earnings together
  const sortedData = dates
    .map((date, index) => ({
      date: new Date(date), // Convert date string to Date object
      earnings: parseFloat(earnings[index]) || 0, // Parse earnings as float or default to 0
    }))
    .sort((a, b) => a.date - b.date); // Sort by date in ascending order

  // Extract sorted dates and earnings back into separate arrays
  const sortedDates = sortedData.map((data) =>
    data.date.toLocaleDateString("en-GB")
  ); // Format date to 'en-GB' format
  const sortedEarnings = sortedData.map((data) => data.earnings); // Get the sorted earnings

  // Calculate total earnings
  const totalEarnings = sortedEarnings.reduce(
    (total, amount) => total + amount,
    0
  );

  // Configure chart data
  const data = {
    labels: sortedDates, // Set X-axis labels to sorted dates
    datasets: [
      {
        label: "Earnings (€)", // Label for the dataset
        data: sortedEarnings, // Set Y-axis data to sorted earnings
        backgroundColor: "rgba(39, 51, 67, 0.6)", // Bar color using the specified hex code with alpha for transparency
        borderColor: "rgba(39, 51, 67, 1)", // Border color using the specified hex code
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
    <div className="mx-auto p-4 bg-white">
      <h2 className="text-2xl font-primary text-primary mb-6">
        Earnings Overview
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <Bar data={data} options={options} /> {/* Render Bar chart */}
      </div>

      {/* Display total earnings as a button */}
      <div className="mt-4 text-right">
        <button className="bg-primary text-white px-4 py-2 rounded">
          Total Earnings: €{totalEarnings.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProfEarning; // Export the component
