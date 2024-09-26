import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryhero from "../assets/images/category-hero.png";

const CATEGORIES_API_URL = "https://backend-taskmate.onrender.com/categories";
const SERVICES_API_URL = "https://backend-taskmate.onrender.com/services";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("Fetched Categories:", data);
        if (Array.isArray(data)) {
          setCategories(data);
          setSelectedCategory(data[0]); // Automatically select the first category
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
          setSelectedCategory(data.categories[0]);
        } else {
          throw new Error("Categories data is not an array");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all services once when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(SERVICES_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        console.log("Fetched Services:", data);
        if (Array.isArray(data)) {
          setServices(data);
          // Set filtered services based on the first selected category
          if (data.length > 0) {
            setFilteredServices(
              data.filter(
                (service) => service.categoryId._id === data[0].categoryId._id
              )
            );
          }
        } else {
          throw new Error("Services data is not an array");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Update filtered services when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = services.filter(
        (service) => service.categoryId._id === selectedCategory._id
      );
      setFilteredServices(filtered);
    }
  }, [selectedCategory, services]);

  const handleCategoryClick = (category) => {
    console.log("Category Clicked:", category);
    if (selectedCategory?._id !== category._id) {
      setSelectedCategory(category);
      setError(null); // Clear any previous errors
    }
  };

  return (
    <>
      <div className="relative">
        <img
          src={categoryhero}
          alt="category hero section"
          className=" w-full"
        />
        <div class="absolute inset-0 bg-black opacity-50 "></div>
      </div>
      <div className="border-b-8 border-tertiary rounded-lg"></div>
      <div className="flex bg-white p-8">
        {/* Sidebar */}
        <div className="w-1/4 bg-tertiary rounded-lg">
          <h3 className="text-xl mt-7 font-semibold font-primary text-white text-center">
            All Categories
          </h3>
          {error && <div className="text-red-500">{error}</div>}
          <ul className="p-8 text-center text-white font-primary">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`cursor-pointer p-2 bg-primary mb-9 rounded-xl text-16px hover:text-secondary ${
                    selectedCategory?._id === category._id
                      ? "text-secondary"
                      : ""
                  }`}
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li>No categories available.</li>
            )}
          </ul>
        </div>

        {/* Main content area */}
        <div className="p-6 flex-grow w-2/4 ">
          {loading ? (
            <div className="text-gray-600">Loading...</div>
          ) : selectedCategory ? (
            <div>
              <h4 className="text-lg font-semibold text-primary font-primary mb-7">
                {selectedCategory.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <div
                      key={service._id}
                      className="border bg-primary shadow-md rounded-xl text-center pb-3"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="max-w-full h-auto object-cover rounded-xl"
                      />
                      <h5 className="mt-3 text-white font-primary text-sm">
                        {service.name}
                      </h5>
                      <Link
                        to={`/services/${service._id}`}
                        className="text-white font-secondary border-b border-secondary text-xs hover:text-secondary"
                      >
                        Read More
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No services available for this category.</div>
                )}
              </div>
            </div>
          ) : (
            <div>Please select a category to view services.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCategory;
