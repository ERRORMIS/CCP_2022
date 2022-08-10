import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useAppContext } from "../context/appContext";

const FinancialFormModal = ({ show, handleOnClose, modelType }) => {
  const typeOptions = ["Revenue", "Operating Expenses", "Development Expenses"];
  const [modelData, setModelData] = useState({
    category: "Revenue",
    description: "",
    date: "",
    amount: "",
    recordType: "",
  });
  const { updateRecords, records } = useAppContext();

  const handleOnChange = (e) => {
    setModelData({ ...modelData, [e.target.name]: e.target.value });
  };

  const handleOnAdd = (e) => {
    e.preventDefault();
    const tempAllRecords = [
      ...records,
      {
        category: modelData.category,
        description: modelData.description,
        date: modelData.date,
        amount: modelData.amount.toString(),
        recordType: modelType,
      },
    ];
    updateRecords(tempAllRecords);
    handleOnCloseModal();
  };

  const handleOnCloseModal = () => { 
    setModelData({
      category: "Revenue",
      description: "",
      date: "",
      amount: "",
      recordType: "",
    });
    handleOnClose();
  }
  return (
    <Modal show={show} onHide={handleOnCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add {modelType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormRowSelect
            name="category"
            value={modelData.category}
            handleChange={handleOnChange}
            list={typeOptions}
          />
          <FormRow
            type="text"
            labelText="Description"
            name="description"
            value={modelData.description}
            handleChange={handleOnChange}
          />
          <FormRow
            type="date"
            labelText="Date"
            name="date"
            value={modelData.date}
            handleChange={handleOnChange}
          />
          <FormRow
            type="number"
            labelText="Amount"
            name="amount"
            value={modelData.amount}
            handleChange={handleOnChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleOnCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinancialFormModal;
