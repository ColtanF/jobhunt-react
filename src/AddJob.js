import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useParams, useHistory } from "react-router";
import "./App.css";

const url = "http://127.0.0.1:5000/job/";
const addUrl = "http://127.0.0.1:5000/job/add_job";
const editUrl = "http://127.0.0.1:5000/job/edit_job/";
const optionalFields = new Set([
  "reqsIMeet",
  "reqsIDontMeet",
  "links",
  "statusNotes",
]);

export default function AddJob() {
  const { id } = useParams();
  // if id exists, then we're editing. Otherwise, it's a new job
  const [job, setJob] = useState({});
  const [invalidFormFields, setInvalidFormFields] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${url}${id}`);
          const data = await response.json();
          if (data[0]) {
            const job = data[0];
            if (!job.statusNotes) job.statusNotes = "";
            setJob(job);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      setJob({
        company: "",
        position: "",
        companyInfo: "",
        positionInfo: "",
        reqsIMeet: "",
        reqsIDontMeet: "",
        salary: "",
        address: "",
        links: "",
        status: "open",
        statusNotes: "",
      });
    }
  }, [id]);

  const validateForm = () => {
    let invalids = [];

    for (const property in job) {
      console.log(property);
      if (job[property].length === 0 && !optionalFields.has(property)) {
        console.log("found empty field");
        invalids.push(property);
      }
    }
    setInvalidFormFields(invalids);
    return invalidFormFields.length === 0 ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      };
      const sendData = async () => {
        try {
          const response = id
            ? await fetch(`${editUrl}${id}`, requestOptions)
            : await fetch(`${addUrl}`, requestOptions);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      sendData();
      history.push("/jobs");
    }
  };

  return (
    <main>
      <section className="section">
        <div className="title">
          <h1>{id ? "Edit" : "New"} Job Posting</h1>
          <Form>
            <Form.Field required>
              <label>Company Name</label>
              <Form.Input
                error={
                  invalidFormFields.includes("company")
                    ? "Please enter a company name."
                    : null
                }
                placeholder="Company Name"
                type="text"
                id="company"
                name="company"
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />
            </Form.Field>
            <Form.Field required>
              <label>Position</label>
              <Form.Input
                error={
                  invalidFormFields.includes("position")
                    ? "Please enter a position title."
                    : null
                }
                placeholder="e.g. Software Engineer"
                type="text"
                id="position"
                name="position"
                value={job.position}
                onChange={(e) => setJob({ ...job, position: e.target.value })}
              />
            </Form.Field>
            <Form.Field required>
              <label>Company Description</label>
              <Form.TextArea
                error={
                  invalidFormFields.includes("companyInfo")
                    ? "Please enter some information about the company."
                    : null
                }
                placeholder="Some info about the company"
                type="text"
                id="companyDescription"
                name="companyDescription"
                value={job.companyInfo}
                onChange={(e) =>
                  setJob({ ...job, companyInfo: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>Position Description</label>
              <textarea
                error={
                  invalidFormFields.includes("positionInfo")
                    ? "Please enter a position description."
                    : null
                }
                placeholder="What does the position entail?"
                type="text"
                id="positionDescription"
                name="positionDescription"
                value={job.positionInfo}
                className="details"
                onChange={(e) =>
                  setJob({ ...job, positionInfo: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Requirements I meet</label>
              <textarea
                type="text"
                id="reqsImeet"
                name="reqsImeet"
                value={job.reqsIMeet}
                className="details"
                onChange={(e) => setJob({ ...job, reqsIMeet: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Requirements I don't meet</label>
              <textarea
                type="text"
                id="reqsIdontMeet"
                name="reqsIdontMeet"
                value={job.reqsIDontMeet}
                className="details"
                onChange={(e) =>
                  setJob({ ...job, reqsIDontMeet: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>Salary (estimate)</label>
              <Form.Input
                error={
                  invalidFormFields.includes("salary")
                    ? "Please enter an estimated salary."
                    : null
                }
                type="text"
                id="salary"
                name="salary"
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              />
            </Form.Field>
            <Form.Field required>
              <label>Address (approx.)</label>
              <Form.Input
                error={
                  invalidFormFields.includes("address")
                    ? "Please enter a company address."
                    : null
                }
                type="text"
                id="address"
                name="address"
                value={job.address}
                onChange={(e) => setJob({ ...job, address: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Links</label>
              <textarea
                type="text"
                id="links"
                name="links"
                value={job.links}
                onChange={(e) => setJob({ ...job, links: e.target.value })}
              />
            </Form.Field>
            <Form.Field required>
              <label>Status</label>
              <select
                id="status"
                name="status"
                value={job.status}
                onChange={(e) => setJob({ ...job, status: e.target.value })}
              >
                <option value="open">Open</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Status Notes</label>
              <textarea
                placeholder="When did you apply? Who have you talked to? etc."
                type="text"
                id="statusNotes"
                name="statusNotes"
                value={job.statusNotes}
                className="details"
                onChange={(e) =>
                  setJob({ ...job, statusNotes: e.target.value })
                }
              />
            </Form.Field>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </main>
  );
}
