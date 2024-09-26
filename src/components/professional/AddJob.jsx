import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GEONAMES_USERNAME = "dhruvi.balar";
const EUROPEAN_COUNTRIES_API_URL = "https://restcountries.com/v3.1/region/europe";
const GEONAMES_CITIES_API_URL = (countryCode) =>
  `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=100&username=${GEONAMES_USERNAME}`;
const CATEGORIES_API_URL = "https://backend-taskmate.onrender.com/categories";
const SERVICES_API_URL = "https://backend-taskmate.onrender.com/services";

const AddJob = ({ isModalOpen, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    service_id: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    country: "",
    city: "",
    description: "",
    referenceImage: null,
    chargesPerHour: "",
  });

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(EUROPEAN_COUNTRIES_API_URL);
        const data = await response.json();
        setCountries(
          data.map((country) => ({
            name: country.name.common,
            code: country.cca2,
          }))
        );
        setLoadingCountries(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const response = await fetch(GEONAMES_CITIES_API_URL(selectedCountry));
          const data = await response.json();
          if (data.geonames && data.geonames.length > 0) {
            setCities(data.geonames.map((city) => city.name));
          } else {
            setCities([]);
            console.error("No cities found for this country.");
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    }
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_API_URL);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchServices = async () => {
        try {
          const response = await fetch(SERVICES_API_URL);
          const data = await response.json();
          const filtered = data.filter(
            (service) => service.categoryId._id === selectedCategory._id
          );
          setFilteredServices(filtered);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
      fetchServices();
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "categoryId") {
      const selected = categories.find((category) => category._id === value);
      setSelectedCategory(selected);
    }

    if (name === "country") {
      setSelectedCountry(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, referenceImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryId", formData.categoryId);
    data.append("service_id", formData.service_id);
    data.append("date", formData.date.toISOString());
    data.append("startTime", formData.startTime.toISOString());
    data.append("endTime", formData.endTime.toISOString());
    data.append("country", formData.country);
    data.append("city", formData.city);
    data.append("description", formData.description);
    data.append("referenceImage", formData.referenceImage);
    data.append("chargesPerHour", formData.chargesPerHour);

    try {
      const response = await fetch("https://backend-taskmate.onrender.com/newJob", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job added successfully:", result);
        handleCloseModal();
      } else {
        console.error("Failed to add job:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while adding the job:", error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-primary p-8 rounded-lg shadow-lg w-[90%] max-w-lg h-[80%] max-h-[700px] overflow-auto">
            <h2 className="text-xl font-primary text-secondary text-center mb-4 ">Add Job</h2>

            <form onSubmit={handleSubmit}>
              {/* Category dropdown */}
              <div className="mb-3 select-dropdown relative">
                <label className="block text-sm font-secondary mb-2 text-white">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service dropdown */}
              <div className="mb-3 select-dropdown relative">
                <label className="block text-sm font-secondary mb-2 text-white">Service</label>
                <select
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                  disabled={!selectedCategory || filteredServices.length === 0}
                >
                  <option value="">Select Service</option>
                  {filteredServices.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                {/* Country dropdown */}
                <div className="w-1/2 mb-3 select-dropdown relative">
                  <label className="block text-sm font-secondary mb-2 text-white">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  >
                    <option value="">Select Country</option>
                    {loadingCountries ? (
                      <option>Loading countries...</option>
                    ) : (
                      countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* City dropdown */}
                <div className="w-1/2 mb-3 select-dropdown relative">
                  <label className="block text-sm font-secondary mb-2 text-white">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                    disabled={loadingCities || !selectedCountry}
                  >
                    <option value="">Select City</option>
                    {loadingCities ? (
                      <option>Loading cities...</option>
                    ) : (
                      cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-5">
                <label className="block text-sm font-secondary mb-2 text-white">Select Date</label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                />
              </div>

              {/* Time Range Picker */}
              <div className="mb-5 relative">
                <label className="block text-sm font-secondary mb-2 text-white">Select Time Range</label>
                <div className="flex space-x-4">
                  {/* Start Time Picker */}
                  <DatePicker
                    selected={formData.startTime}
                    onChange={(time) => setFormData((prev) => ({ ...prev, startTime: time }))}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Start Time"
                    dateFormat="h:mm aa"
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                  <span className="text-white py-2">to</span>
                  {/* End Time Picker */}
                  <DatePicker
                    selected={formData.endTime}
                    onChange={(time) => setFormData((prev) => ({ ...prev, endTime: time }))}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="End Time"
                    dateFormat="h:mm aa"
                    className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="block text-sm font-secondary mb-2 text-white">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  rows="4"
                  required
                />
              </div>

              {/* Reference Image */}
              <div className="mb-3">
                <label className="block text-sm font-secondary mb-2 text-white">Reference Image</label>
                <input
                  type="file"
                  name="referenceImage"
                  onChange={handleFileChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                />
              </div>

              {/* Charges per Hour */}
              <div className="mb-5">
                <label className="block text-sm font-secondary mb-2 text-white">Charges per Hour</label>
                <input
                  type="number"
                  name="chargesPerHour"
                  value={formData.chargesPerHour}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
                  required
                  min="20"
                  max="100"
                />
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddJob;
