import React, { useEffect, useState } from "react";

const CATEGORIES_API_URL = "https://backend-taskmate.onrender.com/categories";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_API_URL);
        const data = await response.json();
        setCategories(data.categories || []); // Ensure categories is always an array
      } catch (error) {
        setError("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4 font-primary">All Categories</h2>
      <div className="grid grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                src={category.image || "https://via.placeholder.com/150"} // Use placeholder if image is missing
                alt={category.name || "No Name"} // Fallback for missing name
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-primary text-white text-center font-primary py-3">
                <h3 className="text-lg font-semibold">{category.name || "No Name"}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
