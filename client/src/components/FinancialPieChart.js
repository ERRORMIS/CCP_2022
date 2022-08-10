import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieRechartComponent = (props) => {
  const { pieData } = props;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</label>
        </div>
      );
    }
    return null;
  };

    return (
      <PieChart width={300} height={300}>
        <Pie
          data={pieData || [{ name: "No records", value: 100 }]}
          color="#000000"
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          className="z-depth-1"
        >
          {pieData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} className="mt-5" />
        <Legend className="mt-5" />
      </PieChart>
    );
}

export default PieRechartComponent;
