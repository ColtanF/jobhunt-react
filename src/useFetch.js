import { useState, useEffect, useCallback } from "react";

// Custom hooks - have to start with "use"
export const useFetch = (url) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = useCallback(async () => {
    const response = await fetch(url);
    const jobs = await response.json();
    setJobs(jobs.data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getJobs();
  }, [url, getJobs]);
  return { jobs, loading };
};
