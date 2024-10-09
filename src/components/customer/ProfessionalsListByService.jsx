import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userImage from "../../assets/images/user.png";

const PROFESSIONAL_BY_SERVICE_ID_URL =
  "https://backend-taskmate.onrender.com/newJob/professionals-for-service-details/";

const GEONAMES_USERNAME = "dhruvi.balar";
const EUROPEAN_COUNTRIES_API_URL =
  "https://restcountries.com/v3.1/region/europe";
const GEONAMES_CITIES_API_URL = (countryCode) =>
  `https://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=100&username=${GEONAMES_USERNAME}`;

// Helper function to format date to dd/mm/yyyy
const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options); // "en-GB" formats to "dd/mm/yyyy"
};

// Convert date from input (yyyy-mm-dd) to dd/mm/yyyy format for comparison
const formatInputDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // Return dd/mm/yyyy format
};

function formatTime(timeString) {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const ProfessionalsListByService = ({ serviceId }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  // For Country and City Dropdowns
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    date: "",
  });

  const navigate = useNavigate();

  // Fetch European countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(EUROPEAN_COUNTRIES_API_URL);
        setCountries(response.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

// Fetch professionals and filter out past-date jobs
useEffect(() => {
  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        `${PROFESSIONAL_BY_SERVICE_ID_URL}${serviceId}`
      );
      const today = new Date().setHours(0, 0, 0, 0); // Today at midnight

      // Filter out professionals whose workingDate is before today
      const futureProfessionals = response.data.filter((professional) => {
        const jobDate = new Date(professional.workingDate).setHours(0, 0, 0, 0);
        return jobDate >= today; // Only include jobs on or after today
      });

      // Sort professionals by workingDate in ascending order
      const sortedProfessionals = futureProfessionals.sort((a, b) => {
        const dateA = new Date(a.workingDate);
        const dateB = new Date(b.workingDate);
        return dateA - dateB; // Ascending order
      });

      setProfessionals(sortedProfessionals);
      setFilteredProfessionals(sortedProfessionals); // Initial filtered professionals
       } catch (err) {
      setError(
        err.response?.data?.message ||
          "No professionals available for this service"
      );
       } finally {
        setLoading(false);
       }
      };

     if (serviceId) {
       fetchProfessionals();
      }
      }, [serviceId]);


  // Fetch cities when a country is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (filters.country) {
        try {
          const selectedCountry = countries.find(
            (country) => country.name.common === filters.country
          );
          const countryCode = selectedCountry.cca2;
          const response = await axios.get(
            GEONAMES_CITIES_API_URL(countryCode)
          );
          setCities(response.data.geonames.map((city) => city.name));
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      } else {
        setCities([]); // Reset cities if no country is selected
      }
    };
    fetchCities();
  }, [filters.country, countries]);

  // Apply filters whenever filters change
  useEffect(() => {
    const { country, city, date } = filters;

    const filtered = professionals.filter((professional) => {
      const matchesCountry = country
        ? professional.country.toLowerCase().includes(country.toLowerCase())
        : true;
      const matchesCity = city
        ? professional.city.toLowerCase().includes(city.toLowerCase())
        : true;
      const matchesDate = date
        ? formatDate(professional.workingDate) === formatInputDate(date) // Compare formatted date (dd/mm/yyyy)
        : true;

      return matchesCountry && matchesCity && matchesDate;
    });

    setFilteredProfessionals(filtered);
  }, [filters, professionals]); // Re-run this effect when filters or professionals change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleViewProfessionalDetailsClick = (id, jobId) => {
    // Pass additional data as state
    navigate(`/professional-detail/${id}`, {
      state: {
        service_id: serviceId,
        job_id: jobId,
      },
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">
            ★
          </span>
        );
      } else if (i === filledStars && halfStar) {
        stars.push(
          <span key={i} className="text-yellow-500 text-4xl mx-1">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-4xl mx-1">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  if (loading) return <div>Loading professionals...</div>;
  if (error) return <div> {error}</div>;

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-10 p-4 bg-primary rounded-xl ">
        <h2 className="text-lg font-primary text-white mb-3">
          Filter Professionals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold font-secondary text-secondary">
              Country
            </label>
            <select
              name="country"
              value={filters.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-secondary font-secondary rounded-lg bg-tertiary bg-opacity-50 "
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold font-secondary text-secondary">
              City
            </label>
            <select
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-secondary font-secondary rounded-lg bg-tertiary bg-opacity-50 "
              disabled={!filters.country}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold font-secondary text-secondary">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-secondary font-secondary rounded-lg bg-tertiary bg-opacity-50 "
            />
          </div>
        </div>
      </div>

      {/* Professional List Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <div
            key={professional._id}
            className="flex flex-col justify-between bg-primary rounded-xl"
          >
            {/* Professional Profile Image */}
            <div className="items-center pb-4 text-center bg-tertiary rounded-xl">
              <img
                src={professional.profileImage || userImage}
                alt={professional.firstName}
                className="w-40 h-40 m-auto rounded-full text-center mt-4 p-1 border-2 border-secondary"
              />

              <p className="text-center font-semibold text-xl text-white font-primary">
                {professional.firstName} {professional.lastName}
              </p>
            </div>

            <div className="items-center pb-4 bg-primary rounded-b-xl">
              <div>
                <p className="text-lg text-center mt-2 text-white font-secondary">
                  {renderStars(professional.averageRating)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Service : </span>
                  {professional.serviceName}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Location : </span>
                  {professional.city}, {professional.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Charges : </span>€
                  {professional.chargesPerHour}/hour
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Working Date : </span>
                  {formatDate(professional.workingDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-left mt-2 ml-3 text-white font-secondary">
                  <span className="text-secondary">Working Time : </span>
                  {formatTime(professional.workingTime.start)} to{" "}
                  {formatTime(professional.workingTime.end)}
                </p>
              </div>

              {/* Button with more detailed text */}
              <div className="float-end mr-4 mt-3">
                <button
                  onClick={() =>
                    handleViewProfessionalDetailsClick(
                      professional.professionalId,
                      professional.jobId
                    )
                  }
                  className="text-xs text-white font-primary border-b border-secondary hover:text-secondary hover:border-white"
                >
                  View {professional.firstName}'s Full Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalsListByService;
