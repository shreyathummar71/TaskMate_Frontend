import React, { useEffect, useState } from "react";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);

  // Fetch all categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend-taskmate.onrender.com/categories"
        );
        const data = await response.json();
        setCategories(data.categories); // Assuming data.categories is an array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (!categories.length) return <div>Loading categories...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <div key={category.id} className="card bg-white shadow-xl">
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
      ))}
    </div>
  );
};

export default AllCategory;
