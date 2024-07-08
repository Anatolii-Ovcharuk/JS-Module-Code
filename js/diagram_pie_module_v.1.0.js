/* "Diagram (pie) module", v. 1.0 - 01.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

import "https://d3js.org/d3.v7.min.js";
import "./d3.v7.min.js";

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/diagram_pie_module_v.1.0.js" type="module"></script> */
/* Use "import "https://d3js.org/d3.v7.min.js";" on this is JS script OR use this line in HTML for include: <script src="./js/d3.v7.min.js"></script> <!-- <script src="https://d3js.org/d3.v7.min.js"></script> --> */
/* Use this line in HTML for include: <div id="diagram_pie" style="display: flex;align-items: center;justify-content: center;"></div> */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


// That's example data for diagram. Data always must be contain {"name", "value"}
let data = [
    { name: "Power", value: 40 },
    { name: "Water", value: 30 },
    { name: "Fuel", value: 20 },
    { name: "Gas", value: 10 },
    { name: "Oil", value: 10 },
];     






// Specify the chart’s dimensions.
const width = 225; // 928
const height = 225; // Math.min(width, 500)
const fontSize = "10px";

// Create the color scale.
const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

// Create the pie layout and arc generator.
const pie = d3.pie()
    .sort(null)
    .value(d => d.value);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

// const labelRadius = arc.outerRadius()() * 0.6;
const labelRadius = arc.outerRadius()() * 0.8 - 10;  // Отступ от края на 10px

// A separate arc generator for labels.
const arcLabel = d3.arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

const arcs = pie(data);

// Create the SVG container.
const svg = d3.select("#diagram_pie").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Add a sector path for each value.
svg.append("g")
    .attr("stroke", "white")
  .selectAll("path")
  .data(arcs)
  .join("path")
    .attr("fill", d => color(d.data.name))
    .attr("d", arc)
  .append("title")
    .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

// Create a new arc generator to place a label close to the edge.
// The label shows the value if there is enough room.
svg.append("g")
    .attr("text-anchor", "middle")
  .selectAll("text")
  .data(arcs)
  .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .call(text => text.append("tspan")
        .attr("y", "2")
        .attr("font-weight", "bold")
        .attr("font-size", fontSize)
        .attr("fill", "#000000")
        .text(d => `${d.data.name}: ${d.data.value}`));
    
