import React from "react";
import { Table } from "react-bootstrap";
import Wrapper from "../assets/wrappers/IncomeExpenseTable";
import { useAppContext } from "../context/appContext";
import { MdDelete } from "react-icons/md";

const IncomeExpenseTable = () => {
  const { records, updateRecords, initialCost } = useAppContext();
  const totalOfIncome = records?.reduce((acc, curr) => {
    if (curr.recordType === "income") {
      return parseFloat(acc) + parseFloat(curr.amount);
    }
    return acc;
  }, 0);

  const totalOfExpense = records?.reduce((acc, curr) => {
    if (curr.recordType === "expense") {
      return parseFloat(acc) + parseFloat(curr.amount);
    }
    return acc;
  }, 0);

  const handleOnDelete = (index) => {
    records.splice(index, 1);
    updateRecords(records);
  };

  const renderTableData = () => {
    if (records?.length === 0) {
      return (
        <tr>
          <td colSpan="6">No records found</td>
        </tr>
      );
    }

    return records?.map((record, index) => {
      if (record.recordType === "income") {
        return (
          <tr key={index}>
            <td align="end">{record.date}</td>
            <td align="end">{record.description}</td>
            <td align="end">{record.category}</td>
            <td align="end">{record.amount}</td>
            <td align="end"></td>
            <td>
              <MdDelete
                className="delete-icon"
                onClick={() => handleOnDelete(index)}
              />
            </td>
          </tr>
        );
      }
      if (record.recordType === "expense") {
        return (
          <tr key={index}>
            <td align="end">{record.date}</td>
            <td align="end">{record.description}</td>
            <td align="end">{record.category}</td>
            <td align="end"></td>
            <td align="end">{record.amount}</td>
            <td>
              <MdDelete
                className="delete-icon"
                onClick={() => handleOnDelete(index)}
              />
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <Wrapper>
      <Table striped bordered hover className="table">
        <thead>
          <tr className="table-topic">
            <td colSpan="6">Income and Expenses ( Rs. )</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>Data</td>
            <td>Description</td>
            <td>Category</td>
            <td>Income</td>
            <td>Expense</td>
            <td></td>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td align="end">{totalOfIncome}</td>
            <td align="end">{totalOfExpense}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={4} className='table-topic'>Balance</td>
            <td align="end">{(totalOfIncome - totalOfExpense) || 0}</td>
            <td></td>
          </tr>
          <tr></tr>
          <tr>
            <td colSpan={4} className="table-topic">
              Initial cost
            </td>
            <td align="end">{initialCost || 0}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={4} className="table-topic">
              Total balance 
            </td>
            <td colSpan={1} align="end">
              {(parseFloat(initialCost) +
                parseFloat(totalOfIncome) -
                parseFloat(totalOfExpense)) || 0}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </Wrapper>
  );
};

export default IncomeExpenseTable;
