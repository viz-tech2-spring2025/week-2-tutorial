import * as d3 from "d3";

export function Chart({ data }) {
  const marginLeft = 200;
  const width = 800;
  const height = 800;
  const marginRight = 40;
  const marginTop = 20;
  const marginBottom = 40;

  console.log("This data inside the chart component:", data[0]["Country Name"]);

  // Filter and process the data
  const numericData = data
    .filter((d) => d["2000"] != null)
    .map((d) => ({
      country: d["Country Name"],
      value: +d["2000"],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 50);

  console.log("numericData", numericData);

  //X axis scale

  //Y axis scale f(data) -> pixels

  return (
    <div>
      <p>Template for the Coding Exercise</p>
      <svg
        style={{ border: "1px solid black" }}
        width={width}
        height={height}
      ></svg>
    </div>
  );
}
