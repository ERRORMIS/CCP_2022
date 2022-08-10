import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Papa from "papaparse";
import AllCSVProjectTable from "./AllCSVProjectTable";

const PROJECT_REQUIREMENT_VALUES = ["computing", "networking", "it"];

const ImportCSVModal = ({ show, handleOnCloseModal }) => {
  const [csvData, setCSVData] = useState([]);
  const [isFileSubmit, setFileSubmit] = useState(false);

  const handleOnClose = () => {
    setFileSubmit(false);
    setCSVData([]);
    handleOnCloseModal();
  };

  const handleOnChangeCSVFile = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setFileSubmit(true);
    const file = e.target.files[0];
    let project;
    const projectList = [];

    Papa.parse(file, {
      step: function (row) {
        const requirements = row.data.requirement.split(",");
        const requirementObjectList = requirements.map((item) => {
          return { label: item, value: item };
        });

        project = {
          ...row.data,
          requirement: requirementObjectList,
        };
        projectList.push(project);
      },
      complete: function (results) {
        setCSVData(projectList);
      },
      header: true,
      skipEmptyLines: "greedy",
      error: function (err, file, inputElem, reason) {},
    });
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleOnClose}
      className="import-csv-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add projects from CSV </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Row>
          {isFileSubmit ? (
            <Col xs={12}>
              <AllCSVProjectTable
                importedProjects={csvData}
                handleOnCancelModal={handleOnClose}
              />
            </Col>
          ) : (
            <Col xs={12}>
              <input
                type="file"
                accept=".csv"
                onChange={handleOnChangeCSVFile}
              />
            </Col>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ImportCSVModal;
