import React from "react";
import { useParams } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Button, Rating } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { useFetch } from "./useFetch";

const url = "http://127.0.0.1:5000/job/";

export default function SingleJob() {
  const { id } = useParams();
  const { jobs, loading } = useFetch(`${url}${id}`);
  const job = jobs[0];
  // const prettierDate = Date.parse(job.create_date);
  // console.log(prettierDate);

  const handleRate = (e, { rating }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating }),
    };
    const sendData = async () => {
      try {
        const response = await fetch(
          `${url}update_rating/${job.id}`,
          requestOptions
        );
        const data = await response.json();
        //TODO: do something with data to verify whether the request
        // worked or not
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <section className="section">
        <div className="title">
          <Link to={`/edit_job/${id}`} className="btn float-right">
            <Button primary>Edit Job</Button>
          </Link>
          <h2>{job.position}</h2>
          <p>
            {job.company} - Date added: {job.create_date}
          </p>
          <p>
            Location:{" "}
            <a
              href={`https://google.com/maps/search/${job.address}`}
              target="_blank"
              rel="noreferrer"
            >
              {job.address}
            </a>
          </p>
          <p>Salary: {job.salary}</p>
          <p className="proper-cell">Status: {job.status}</p>
          <p>Rating:</p>
          <Rating
            icon="star"
            maxRating={5}
            defaultRating={job.rating}
            onRate={handleRate}
          />
          <br />
          <hr />
        </div>
        <h5>About {job.company}</h5>
        <div className="details">{ReactHtmlParser(job.companyInfo)}</div>
        <h5>Position Info</h5>
        <div className="details">{ReactHtmlParser(job.positionInfo)}</div>
        <h5>Requirements I meet</h5>
        <div className="details">{ReactHtmlParser(job.reqsIMeet)}</div>
        <h5>Requirements I don't meet</h5>
        <div className="details">{ReactHtmlParser(job.reqsIDontMeet)}</div>
        <h5>Status Notes:</h5>
        <div className="details">{job.statusNotes}</div>
        <h5>Link(s):</h5>
        <p>
          <a href={job.links} target="_blank" rel="noreferrer">
            {job.links}
          </a>
        </p>
      </section>
    </main>
  );
}
