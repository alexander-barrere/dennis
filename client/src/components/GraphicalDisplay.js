import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphicalDisplay = ({ dnsResponse }) => {
  const chartRef = useRef(null);

  const drawChart = (answers) => {
    const svg = d3.select(chartRef.current);
    const margin = 50;
    const width = 600 - 2 * margin;
    const height = 400 - 2 * margin;

    svg.selectAll('*').remove();

    const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, Math.max(...answers.map(d => d.ttl))]);
    chart.append('g').call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand().range([0, width]).domain(answers.map(d => d.name)).padding(0.2);
    chart.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

    chart.selectAll().data(answers).enter().append('rect').attr('x', d => xScale(d.name)).attr('y', d => yScale(d.ttl)).attr('height', d => height - yScale(d.ttl)).attr('width', xScale.bandwidth());
  };

  useEffect(() => {
    if (dnsResponse && dnsResponse.data && Array.isArray(dnsResponse.data.answers)) {
      drawChart(dnsResponse.data.answers);
    }
  }, [dnsResponse]);

  return (
    <div>
      <svg ref={chartRef} width={600} height={400}></svg>
    </div>
  );
};

export default GraphicalDisplay;
