import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import JobList from "./JobList";
import { useFetch } from "./useFetch";

const url = "http://coltanfranke-jobhunt-api.herokuapp.com/jobs";
const deleteUrl =
  "http://coltanfranke-jobhunt-api.herokuapp.com/job/delete_job/";

export default function ViewJobs() {
  const [jobList, setJobList] = useState([]);

  const { jobs, loading } = useFetch(url);
  const categories = ["all", "open", "applied", "rejected", "interviewing"];

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  const filterItems = (category) => {
    if (category === "all") setJobList(jobs);
    else {
      const newItems = jobs.filter((item) =>
        item.status.toUpperCase().includes(category.toUpperCase())
      );
      setJobList(newItems);
    }
  };

  const handleDelete = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    const sendDelete = async () => {
      try {
        const response = await fetch(`${deleteUrl}${id}`, requestOptions);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    sendDelete();
    const result = jobList.filter((item) => item.id !== id);
    setJobList(result);
  };

  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>Job List</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filter={filterItems} />
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <JobList jobs={jobList} handleDelete={handleDelete} />
        )}
      </section>
    </main>
  );
}
