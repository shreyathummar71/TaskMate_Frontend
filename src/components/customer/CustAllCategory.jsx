import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FindProfessional from "./FindProfessional";
import ProfessionalsListByService from "./ProfessionalsListByService";

const CATEGORIES_API_URL = "https://backend-taskmate.onrender.com/categories";
const SERVICES_API_URL = "https://backend-taskmate.onrender.com/services";

const CustAllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [professional, setProfessional] = useState(false); 
  const [allservices, setallServices] = useState(true); 
  const [selectedService, setSelectedService] = useState(null); 
  const [professionals, setProfessionals] = useState([]); // Add state for professionals

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_API_URL);
        const data = await response.json();
        setCategories(data.categories || []); 
      } catch (error) {
        setError("Error fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch services based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchServices = async () => {
        setLoading(true);
        try {
          const response = await fetch(SERVICES_API_URL);
          const data = await response.json();
          const filtered = data.filter(
            (service) => service.categoryId._id === selectedCategory._id
          );
          setFilteredServices(filtered);
        } catch (error) {
          setError("Error fetching services");
          console.error("Error fetching services:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchServices();
    }
  }, [selectedCategory]);

  // Handle click on a category card
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); 
    setError(null); 
    setProfessional(false); 
    setallServices(true); 
  };

  const handleFindProfessionalClick = async (service) => {
    setSelectedService(service); // Store the entire service object
    setProfessional(true); 
    setallServices(false); 

    // Fetch professionals for the selected service
    try {
      const response = await fetch(`https://backend-taskmate.onrender.com/newJob/professionals-for-service-details/${service._id}`);
      const data = await response.json();
      setProfessionals(data || []); // Set the professionals array
    } catch (error) {
      setError("Error fetching professionals");
      console.error("Error fetching professionals:", error);
    }
  };

  const handleBackToServices = () => {
    setProfessional(false);
    setallServices(true);
    setSelectedService(null); 
    setProfessionals([]); // Reset professionals state
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      {allservices && !professional && (
        <div>
          {!selectedCategory ? (
            <div>
              <h2 className="text-2xl mb-8 font-primary">All Categories</h2>
              <div className="grid grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-gray-100 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => handleCategoryClick(category)} 
                  >
                    <div className="relative">
                      <img
                        src={
                          category.image || "https://via.placeholder.com/150"
                        } 
                        alt={category.name || "No Name"} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-0 w-full bg-primary text-white text-center font-primary py-3">
                        <h3 className="text-lg ">
                          {category.name || "No Name"}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-primary">
                  {selectedCategory.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)} 
                  className="bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
                >
                  Back to Categories
                </button>
              </div>
              {loading ? (
                <div className="text-center text-gray-600">
                  Loading services...
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <div
                        key={service._id}
                        className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative">
                          <img
                            src={
                              service.image || "https://via.placeholder.com/150"
                            } 
                            alt={service.name || "No Name"} 
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute bottom-0 w-full bg-primary text-white text-center font-primary ">
                            <h3 className="text-lg mt-3 ">
                              {service.name || "No Name"}
                            </h3>
                          </div>
                        </div>
                        <div className="bg-primary text-white p-4 flex justify-between items-center">
                          <Link
                            to={`/services/${service._id}`}
                            className="text-sm font-secondary border-b border-secondary hover:text-secondary hover:border-white"
                          >
                            Read More
                          </Link>

                          <button
                            onClick={() => handleFindProfessionalClick(service)} 
                            className="text-sm font-secondary border-b border-secondary hover:text-secondary hover:border-white"
                          >
                            Find Professional
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-600">
                      No services available for this category.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {professional && selectedService && (
        <div>
          {/* Header row with Service Name and Back Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-primary">
              Professionals for {selectedService.name} 
            </h2>
            <button
              onClick={handleBackToServices} 
              className="bg-tertiary bg-opacity-50 border border-secondary text-primary px-4 py-2 rounded-xl font-primary text-sm hover:bg-secondary hover:text-white"
            >
              Back to Services
            </button>
          </div>

          {/* Check if there are professionals for the selected service */}
          {professionals.length > 0 ? (
            <ProfessionalsListByService serviceId={selectedService._id} />
          ) : (
            <div className="text-center text-gray-600">
              No professionals for {selectedService.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustAllCategory;
