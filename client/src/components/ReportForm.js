import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import FormRow from "./FormRow";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ReportForm";
import FinancialFormModal from "./FinancialFormModal";
import IncomeExpenseTable from "./IncomeExpenseTable";
import FinancialPieChart from "./FinancialPieChart";
import FinancialBarChart from "./FinancialBarChart";
import Loading from "./Loading";

const initIncomeData = [
  { name: "Revenue", value: 0, total: 0 },
  { name: "Operating Expenses", value: 0, total: 0 },
  { name: "Development Expenses", value: 0, total: 0 },
];

const initExpenseData = [
  { name: "Revenue", value: 0, total: 0 },
  { name: "Operating Expenses", value: 0, total: 0 },
  { name: "Development Expenses", value: 0, total: 0 },
];

const ReportForm = () => {
  const {
    initialCost,
    handleChange,
    saveFinancialDetail,
    records,
    chartRecords,
    isLoading,
  } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [modelType, setModelType] = useState("");
  const [incomeData, setIncomeData] = useState(initIncomeData);
  const [expenseData, setExpenseData] = useState(initExpenseData);
  const [barChartData, setBarChartData] = useState([
    { name: "Income", value: 0 },
    { name: "Expenses", value: 0 },
  ]);

  const totalOfIncome = () => {
    const total = chartRecords?.reduce((acc, curr) => {
      if (curr.recordType === "income") {
        return parseFloat(acc) + parseFloat(curr.amount);
      }
      return acc;
    }, 0);
    return total;
  };

  const totalOfExpense = () => {
    const total = chartRecords?.reduce((acc, curr) => {
      if (curr.recordType === "expense") {
        return parseFloat(acc) + parseFloat(curr.amount);
      }
      return acc;
    }, 0);
    return total;
  };

  const abstractDataForPieCharts = () => {
    const tempIncomeData = initIncomeData.slice();
    const tempExpenseData = initExpenseData.slice();

    tempIncomeData[0].total = 0;
    tempIncomeData[1].total = 0;
    tempIncomeData[2].total = 0;

    tempExpenseData[0].total = 0;
    tempExpenseData[1].total = 0;
    tempExpenseData[2].total = 0;

    chartRecords?.forEach((record) => {
      if (record.recordType === "income") {
        if (record.category === "Revenue") {
          tempIncomeData[0].total =
            parseFloat(record.amount) + parseFloat(tempIncomeData[0].total);
        } else if (record.category === "Operating Expenses") {
          tempIncomeData[1].total =
            parseFloat(record.amount) + parseFloat(tempIncomeData[1].total);
        } else if (record.category === "Development Expenses") {
          tempIncomeData[2].total =
            parseFloat(record.amount) + parseFloat(tempIncomeData[2].total);
        }
      } else if (record.recordType === "expense") {
        if (record.category === "Revenue") {
          tempExpenseData[0].total =
            parseFloat(record.amount) + parseFloat(tempExpenseData[0].total);
        } else if (record.category === "Operating Expenses") {
          tempExpenseData[1].total =
            parseFloat(record.amount) + parseFloat(tempExpenseData[1].total);
        } else if (record.category === "Development Expenses") {
          tempExpenseData[2].total =
            parseFloat(record.amount) + parseFloat(tempExpenseData[2].total);
        }
      }
    });

    tempIncomeData[0].value =
      (parseFloat(tempIncomeData[0].total) / parseFloat(totalOfIncome())) * 100;
    tempIncomeData[1].value =
      (parseFloat(tempIncomeData[1].total) / parseFloat(totalOfIncome())) * 100;
    tempIncomeData[2].value =
      (parseFloat(tempIncomeData[2].total) / parseFloat(totalOfIncome())) * 100;
    setIncomeData(tempIncomeData);

    // tempExpenseData[0].value =
    //   (parseFloat(tempExpenseData[0].total) / parseFloat(totalOfExpense())) *
    //   100;
    // tempExpenseData[1].value =
    //   (parseFloat(tempExpenseData[1].total) / parseFloat(totalOfExpense())) *
    //   100;
    // tempExpenseData[2].value =
    //   (parseFloat(tempExpenseData[2].total) / parseFloat(totalOfExpense())) *
    //   100;

    setExpenseData(tempExpenseData);
  };

  useEffect(() => {
    abstractDataForPieCharts();
    setBarChartData([
      { name: "Income", value: totalOfIncome() },
      { name: "Expenses", value: totalOfExpense() },
    ]);
  }, [chartRecords]);

  const handleOnChangeInitialCost = (e) => {
    handleChange({
      name: "initialCost",
      value: e.target.value,
    });
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const handleOnClickIncomeExpense = (typeOfModel) => {
    if (typeOfModel === "income") {
      setModelType("income");
    } else {
      setModelType("expense");
    }
    setShowModal(true);
  };

  const handleOnClickSave = async () => {
    await saveFinancialDetail(records);
    abstractDataForPieCharts();
  };

  return (
    <Wrapper>
      <Row id="report-section">
        <Col className="px-1" xs={5}>
          <FormRow
            labelText="Initial cost (Rs.)"
            value={initialCost}
            type="number"
            handleChange={handleOnChangeInitialCost}
          />
        </Col>
        <Col xs={{ offset: 2, span: 2 }} className="pt-4">
          <button
            className="btn income-btn"
            onClick={() => handleOnClickIncomeExpense("income")}
          >
            + Income
          </button>
        </Col>
        <Col xs={{ offset: 1, span: 2 }} className="pt-4">
          <button
            className="btn expense-btn"
            onClick={() => handleOnClickIncomeExpense("expense")}
          >
            + expense
          </button>
        </Col>
      </Row>
      <FinancialFormModal
        show={showModal}
        handleOnClose={handleOnClose}
        modelType={modelType}
      />
      <IncomeExpenseTable />
      <Row className="d-flex justify-content-center">
        <Col className="px-1" xs={10}>
          <button className="btn save-btn w-100" onClick={handleOnClickSave}>
            save
          </button>
        </Col>
      </Row>

      {isLoading ? (
        <div className="mt-5">
          <Loading center />
        </div>
      ) : (
        <>
          <Row>
            <Col className="px-4 mt-5" xs={6}>
              <h5>Income</h5>
              <FinancialPieChart pieData={incomeData} />
            </Col>
            <Col className="px-4 mt-5" xs={6}>
              <h5>Expense</h5>
              <FinancialPieChart pieData={expenseData} />
            </Col>
          </Row>
          <Row className="mt-5">
            <h5 className="my-5">Income and Expenses</h5>
            <FinancialBarChart data={barChartData} />
          </Row>
        </>
      )}
    </Wrapper>
  );
};

export default ReportForm;
