import * as d3 from "d3";
import { useState } from "react";

export function Chart({ data }) {
  const marginLeft = 200;
  const width = 800;
  const height = 800;
  const marginRight = 40;
  const marginTop = 20;
  const marginBottom = 40;

  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  // State for tracking hovered bar
  const [hovered, setHovered] = useState(null);

  const [rectangledHovered, setRectangleHovered] = useState(null)

  // Filter and process the data
  const numericData = data
    .filter((d) => d["2000"] != null) // Filter out null values
    .map((d) => ({
      country: d["Country Name"],
      value: +d["2000"],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 50); // Get top 50 countries

  const max = d3.max(numericData, (d) => d.value);

  // Scales
  const xScale = d3.scaleLinear().domain([0, max]).range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(numericData.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.3);

  // X-Axis Ticks
  const xTicks = xScale.ticks(10).map((tick) => (
    <g key={tick} transform={`translate(${xScale(tick)}, ${innerHeight})`}>
      <line y2="6" stroke="black" />
      <text dy="1.9em" textAnchor="middle" fontSize="10">
        {tick}
      </text>
    </g>
  ));

  // Y-Axis Ticks
  const yTicks = yScale.domain().map((tick) => (
    <g
      key={tick}
      transform={`translate(0, ${yScale(tick) + yScale.bandwidth() / 2})`}
    >
      <line x2="-6" stroke="black" />
      <text dx="-10" dy="0.3em" textAnchor="end" fontSize="10">
        {tick}
      </text>
    </g>
  ));

  return (
    <div>
      <p>Template for the Coding Exercise</p>
      <svg style={{ border: "1px solid black" }} width={width} height={height}>
        <g
          width={innerWidth}
          height={innerHeight}
          transform={`translate(${marginLeft}, ${marginTop})`}
        >
          {/* Bars */}
          {numericData.map((d) => (
            <rect
              key={d.country}
              x={0} // Adjusted because the group <g> is already translated
              y={yScale(d.country)}
              width={xScale(d.value)}
              height={yScale.bandwidth()}
              fill="#9F7BF7"
              fillOpacity={hovered && hovered !== d.country ? 0.3 : 1} // Non-hovered bars fade out
              strokeWidth={1}
              onMouseEnter={() => setHovered(d.country)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {/* X-Axis */}
          <line
            x1={0}
            x2={innerWidth}
            y1={innerHeight}
            y2={innerHeight}
            stroke="black"
          />
          {xTicks}

          {/* Y-Axis */}
          <line x1={0} x2={0} y1={0} y2={innerHeight} stroke="black" />
          {yTicks}
        </g>
      </svg>
    </div>
  );
}
