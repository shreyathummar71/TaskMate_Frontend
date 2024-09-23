import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend-taskmate.onrender.com/categories"
        );
        const data = await response.json();
        // Duplicate first 4 categories for smooth infinite loop
        setCategories([...data.categories, ...data.categories.slice(0, 4)]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Reset to the first item after reaching the end of the categories
        if (prevIndex >= categories.length - 4) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [categories]);

  // Function to manually go to the previous category
  const handlePrev = () => {
    // setCurrentIndex((prevIndex) =>
    //   prevIndex <= 0 ? categories.length - 4 : prevIndex - 1
    // );
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );
  };

  // Function to manually go to the next category
  const handleNext = () => {
    // setCurrentIndex((prevIndex) =>
    //   prevIndex >= categories.length - 4 ? 0 : prevIndex + 1
    // );
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  return (
    <div className="relative w-full overflow-hidden px-20 float-start">
      <Link to="/AllCategory">See All</Link>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${
            (currentIndex / categories.length) * 100
          }%)`, // Adjust for smooth sliding
        }}
      >
        {categories
          // .slice(currentIndex, currentIndex + 4)
          .map((category, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 p-2">
              {" "}
              {/* Change to w-1/4 for four items */}
              <div className="card bg-white shadow-xl">
                <figure>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary">{category.name}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white rounded-full p-2"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white rounded-full p-2"
      >
        &gt;
      </button>
    </div>
  );
};

export default Category;
