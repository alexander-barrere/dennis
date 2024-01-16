import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import styles from './GraphicalDisplay.module.css';

const GraphicalDisplay = ({ dnsResponse }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (dnsResponse && dnsResponse.data && Array.isArray(dnsResponse.data.answers)) {
      // Create a summary of record types
      const summary = dnsResponse.data.answers.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      // Convert summary to array suitable for the pie chart
      const chartData = Object.keys(summary).map(key => ({
        name: key,
        value: summary[key],
      }));

      setChartData(chartData);
    }
  }, [dnsResponse]);

  // Define an array of color class names that correspond to the classes defined in the CSS module
  const colorClasses = [styles.color0, styles.color1, styles.color2, styles.color3];

  return (
    <div className={styles.chartContainer}>
      <PieChart width={730} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorClasses[index % colorClasses.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GraphicalDisplay;
