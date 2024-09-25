import { useState, useEffect } from "react";

const useFetchFeedback = (url) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data");
        }
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { feedback, loading, error };
};

export default useFetchFeedback;
