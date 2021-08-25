import React from "react";
import { Table, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

const JobList = ({ jobs, handleDelete }) => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {jobs.map((item) => {
          const { id, company, position, status } = item;
          return (
            <Table.Row key={id}>
              <Table.Cell>{company}</Table.Cell>
              <Table.Cell className="proper-cell">
                <Link to={`/view_job/${id}`}>{position}</Link>
              </Table.Cell>
              <Table.Cell className="proper-cell">{status}</Table.Cell>

              <Table.Cell>
                <Link to={`/edit_job/${id}`}>
                  <Button primary>
                    <i className="edit icon"></i> Edit
                  </Button>
                </Link>
                <Button color="red" onClick={() => handleDelete(id)}>
                  <i className="minus circle icon"></i>Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
        {jobs.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan="4">No results found.</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default JobList;
