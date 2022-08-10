import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinancialBarChart = (props) => {
  const { data } = props;

  return (
    <BarChart width={300} height={600} data={data}>
      <Bar dataKey="value" fill="orange" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </BarChart>
  );
};

export default FinancialBarChart;
