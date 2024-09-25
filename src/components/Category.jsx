import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4; // Show 4 cards at a time
  const delay = 3000; // 3 seconds delay between slides

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend-taskmate.onrender.com/categories"
        );
        const data = await response.json();
        setCategories(data.categories || []); // Ensure categories is always an array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, delay);

    return () => clearInterval(interval);
  }, [currentIndex, categories]);

  // Function to manually go to the previous category
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  // Function to manually go to the next category
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  // Calculate the visible categories with a circular shift
  const visibleCategories = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleCategories.push(categories[(currentIndex + i) % categories.length]);
  }

  return (
    <div className="relative w-full overflow-hidden px-10 float-start bg-white py-9">
      <div className="float-end text-right w-full">
        <Link
          to="/allcategory"
          className="font-primary text-primary pb-2 float-end w-full"
        >
          See All »
        </Link>
      </div>
      <div className="flex transition-transform duration-700 ease-in-out float-start w-full">
        {visibleCategories.map((category, index) => {
          // Check if category and image exist before rendering the card
          if (!category) return null;

          const imageUrl = category.image || "https://via.placeholder.com/150"; // Use a placeholder if image is missing

          return (
            <div key={index} className="w-1/4 p-2 text-center">
              <div className="float-start w-full text-center">
                <figure>
                  <img
                    src={imageUrl}
                    alt={category.name || "Unknown Category"} // Fallback for missing name
                    className="h-48 w-full object-cover font-primary rounded-lg"
                  />
                </figure>
                <div className="card-body py-3">
                  <h2 className="card-title text-primary font-primary text-base text-center block">
                    {category.name || "No Name"}{" "}
                    {/* Fallback for missing name */}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
