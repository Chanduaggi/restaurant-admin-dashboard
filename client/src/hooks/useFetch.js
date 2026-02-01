import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for fetching data from API
 * Handles loading states, errors, and automatic refetching
 * 
 * @param {string} url - The API endpoint URL
 * @param {object} options - Optional configuration (method, body, etc.)
 * @returns {object} { data, loading, error, refetch }
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios({
        url,
        method: options.method || 'GET',
        data: options.body,
        ...options
      });
      
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
