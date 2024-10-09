import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog_LP = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const blogsPerView = 4; // Show 4 blogs at a time
  const delay = 3000; // Auto-slide delay (3 seconds)

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://backend-taskmate.onrender.com/blogs"
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, delay);

    return () => clearInterval(interval);
  }, [currentIndex, blogs]);

  // Function to manually go to the next set of blogs
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + blogsPerView) % blogs.length);
  };

  // Calculate the visible blogs based on the current index
  const visibleBlogs = [];
  for (let i = 0; i < blogsPerView; i++) {
    visibleBlogs.push(blogs[(currentIndex + i) % blogs.length]);
  }

  return (
    <div className="px-8 py-8">
      <h1 className="text-left text-2xl text-primary font-primary mb-4">
        Our Blogs
      </h1>

      {/* Blogs Carousel */}
      <div className="flex transition-transform duration-700 ease-in-out">
        {visibleBlogs.map((blog, index) => {
          // Ensure blog object exists before rendering
          if (!blog) return null;

          // Use a placeholder image if coverImage is missing
          const coverImage =
            blog.coverImage || "https://via.placeholder.com/150";

          return (
            <div key={index} className="w-1/4 px-3 text-center">
              {/* Card with flex-grow to stretch the card */}
              <div className="bg-primary shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <img
                  src={coverImage}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="p-3">
                  <h2 className="font-secondary mb-2 text-secondary text-md">
                    {blog.title || "Untitled Blog"}
                  </h2>
                  <p className="text-white font-secondary mb-2 text-sm flex-grow">
                    {blog.excerpt || "No excerpt available."}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-white font-secondary border-b border-secondary text-sm hover:text-secondary"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog_LP;
