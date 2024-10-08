import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import a hero image
import heroImage from "../assets/images/blogs.webp"; 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://backend-taskmate.onrender.com/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative hero-img bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${heroImage})`, // Use the imported hero image
          height: "600px",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content on top of the overlay */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="header-text text-4xl font-bold">Welcome to Our Blogs</h1>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-3xl text-primary font-primary mb-12 ml-3">Our Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-primary shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-md mb-4"
              />
              <h2 className="text-lg font-secondary mb-2 text-secondary flex-grow">
                {blog.title}
              </h2>
              <p className="text-white font-secondary mb-4 flex-grow">
                {blog.excerpt}
              </p>
              <div className="mt-auto flex justify-end">
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-white font-secondary border-b border-secondary text-sm hover:text-secondary"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
