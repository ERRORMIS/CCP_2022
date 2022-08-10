import React, { useState } from "react";
import { Row, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import Wrapper from "../assets/wrappers/AllCSVProjectTable";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AllCSVProjectTable = (props) => {
  const { importedProjects, handleOnChangeImportData, handleOnCancelModal } =
    props;
  const { saveCSVProjects } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnDelete = (index) => {
    handleOnChangeImportData(index);
  };

  const renderTableData = () => {
    if (importedProjects?.length === 0) {
      return (
        <tr>
          <td colSpan="6">No records found</td>
        </tr>
      );
    }

    return importedProjects?.map((project, index) => {
      if (project.title === "") {
        return;
      }

      return (
        <tr key={index}>
          <td align="start">{project.title}</td>
          <td align="start">{project.startDate}</td>
          <td align="start">{project.endDate}</td>
          <td align="start">
            {project?.requirement.map(({ value }) => value).join(", ")}
          </td>
          <td align="start">{project.description}</td>
          <td align="start">{project.status}</td>
          <td align="start">{project.owner}</td>
          {/* <td>
            <MdDelete
              className="delete-icon"
              onClick={() => handleOnDelete(index)}
            />
          </td> */}
        </tr>
      );
    });
  };

  const handleOnSave = async () => {
    setIsLoading(true);
    if (importedProjects.length === 0) {
      setIsLoading(false);
      return;
    }
    saveCSVProjects(importedProjects);
    handleOnCancel()
  };

  const handleOnCancel = () => {
    handleOnCancelModal();
  };

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loading center />
      </div>
    );
  }

  return (
    <Wrapper>
      <Row className="table">
        <Table striped bordered hover>
          <thead>
            <tr className="table-topic">
              <td colSpan="6">Import Project</td>
            </tr>
          </thead>
          <thead>
            <tr className="">
              <td>Title</td>
              <td>Start date</td>
              <td>End date</td>
              <td>Project requirements</td>
              <td>Description</td>
              <td>Status</td>
              <td>Owner</td>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </Table>
      </Row>
      <Row>
        <button className="btn save-btn" onClick={handleOnSave}>
          Save
        </button>
        <button className="btn cancel-btn" onClick={handleOnCancel}>
          Cancel
        </button>
      </Row>
    </Wrapper>
  );
};

export default AllCSVProjectTable;
