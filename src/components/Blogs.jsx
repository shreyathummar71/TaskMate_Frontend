import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [articles, setArticles] = useState([]);

  // Replace with your own NewsAPI key
  const API_KEY = "f81fcab4de3440adbe03fe5d25741c93";
  const API_URL = `https://newsapi.org/v2/everything?q=home%20cleaning%20OR%20cleaning%20tips%20OR%20housekeeping%20OR%20home%20maintenance&apiKey=${API_KEY}`;

  useEffect(() => {
    // Fetching blog articles from NewsAPI
    axios
      .get(API_URL)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching the articles:", error);
      });
  }, []);

  return (
    <div className="blog-container" style={styles.blogContainer}>
      <h2>Latest Home Improvement Blogs</h2>
      <div className="blog-cards" style={styles.cardContainer}>
        {articles.map((article, index) => (
          <div key={index} className="card" style={styles.card}>
            <img
              src={article.urlToImage}
              alt={article.title}
              style={styles.image}
            />
            <div className="card-content" style={styles.cardContent}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple styling for the blog cards
const styles = {
  blogContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  },
  cardContent: {
    padding: "15px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
};

export default Blogs;
