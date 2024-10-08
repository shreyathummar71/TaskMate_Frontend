import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams(); // Get blog ID from the URL
  const [blog, setBlog] = useState(null);

  // Fetch the full blog post based on the ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://backend-taskmate.onrender.com/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-96 object-cover rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-4">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
        <div className="text-lg text-gray-800 leading-relaxed">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
