/* "Diagram (pie) module", v. 1.3 - 15.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

import "https://d3js.org/d3.v7.min.js";
import "./d3.v7.min.js";

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/diagram_pie_module_v.1.0.js" type="module"></script> */
/* Use "import "https://d3js.org/d3.v7.min.js";" on this is JS script OR use this line in HTML for include: <script src="./js/d3.v7.min.js"></script> <!-- <script src="https://d3js.org/d3.v7.min.js"></script> --> */
/* Use this line in HTML for include: 
    <div id="diagram_pie" style="display: flex;align-items: center;justify-content: center;"></div>
    <fieldset style="width: 200px;height: auto;margin: 20px;">
        <legend>Legend / Легенда</legend>
        <div id="diagram_pie_legend"></div>
        <p id="legend_pie_total"></p>
    </fieldset>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const SORT_DATA_IN_LEGEND = true; /* That's option sort data in legend. Set: True/False */
const REFRESH = true; /* That's option refresh diagram and legend each 1 seconds. Set: True/False */





// That's example data for diagram. Data always must be contain {"name", "value"}. Delete this for future use.
let data = [
    { name: "Power", value: 40 },
    { name: "Water", value: 30 },
    { name: "Fuel", value: 20 },
    { name: "Gas", value: 10 },
    { name: "Oil", value: 10 },
];     

// Example update and show data. Delete this for future use.
setInterval(() => { 
    removeDataItem("Oil");

    data[2].value += 10;
    setTimeout(() => { data[2].value -= 10 }, 2000);

    data[0].value -= 25
    setTimeout(() => { data[0].value += 25 }, 2000)

    data[1].value += 25
    setTimeout(() => { data[1].value -= 25 }, 1000)

    setTimeout(() => { data.push({ name: "Oil", value: 10 }) }, 2000);
    
    setTimeout(() => { data[4].value += 5 }, 3000)

    function removeDataItem(itemName) {
        const index = data.findIndex(d => d.name === itemName);
        if (index !== -1) {
            data.splice(index, 1);
        }
    }
}, 4000);





// Specify the chart’s dimensions.
const width = 225; // 928
const height = 225; // Math.min(width, 500)
const fontSize = "10px";

let totalValue = d3.sum(data, d => d.value);
document.getElementById("legend_pie_total").innerText = `Total: ${totalValue}`;

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

// Вычисляем общую сумму всех значений.
const total = d3.sum(data, d => d.value);

// Add a sector path for each value.

svg.append("g")
    .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", d => color(d.data.name))
    .attr("d", arc)
    .append("title")
    // .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
    .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`);

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
        // .text(d => `${d.data.name}: ${d.data.value}`));
        .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`));
    



/* ========================= That's code about legend ========================= */
const legend =  d3.select("#diagram_pie_legend").selectAll(".legend-item")
            .data(data)
            .enter().append("div")
            .attr("class", "legend-item");

    legend.append("div")
            .attr("class", "legend-color")
            .style("background-color", d => color(d.name))
            .style("width", "20px")
            .style("height", "20px")
            .style("margin", "4px 8px");

    legend.append("p")
        // .text(d => `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(0)}%`);
        .text(d => `${d.name}: ${d.value}`);






    /* ========================= That's code update diagram ========================= */
    
if (REFRESH) {
    setInterval(() => {
        totalValue = d3.sum(data, d => d.value);
        document.getElementById("legend_pie_total").innerText = `Total: ${totalValue}`;

        update_pie_diagram();
        update_pie_legend();
    }, 1000);

    function update_pie_legend() {
        let legend = null;

        if (SORT_DATA_IN_LEGEND) {
                // Sort data by value in descending order
            const sortedData = [...data].sort((a, b) => b.value - a.value);

            legend = d3.select("#diagram_pie_legend")
            .selectAll(".legend-item")
            .data(sortedData);

        } else if (!SORT_DATA_IN_LEGEND) {
            legend = d3.select("#diagram_pie_legend")
            .selectAll(".legend-item")
            .data(data);
        } else {
            console.error("Error with options value!");
            legend = d3.select("#diagram_pie_legend")
            .selectAll(".legend-item")
            .data(data);
        };

        legend.join(
            enter => {
                const legendItem = enter.append("div").attr("class", "legend-item");
                legendItem.append("div")
                    .attr("class", "legend-color")
                    .style("background-color", d => color(d.name))
                    .style("width", "20px")
                    .style("height", "20px")
                    .style("margin", "4px 8px");
                legendItem.append("p")
                    // .text(d => `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%`);
                    .text(d => `${d.name}: ${d.value}`);
            },
            update => {
                update.select(".legend-color")
                    .style("background-color", d => color(d.name));
                update.select("p:nth-child(2)")
                    // .text(d => `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(1)}%`);
                    .text(d => `${d.name}: ${d.value}`);
            },
            exit => exit.remove()
        );
    };

    function update_pie_diagram() {
        const arcs = pie(data);

        // Добавляем дуги для каждого значения с анимацией.
        const path = svg.selectAll("path")
            .data(arcs);

        svg.selectAll("title")
            // .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
            .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`)
        
        path.join(
            enter => enter.append("path")
                .attr("stroke", "white")
                .attr("fill", d => color(d.data.name))
                .attr("d", arc)
                .each(function(d) { this._current = d; })
                .append("title")
                // .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`),
                .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`),
            
            update => update
                .transition().duration(750)
                .attrTween("d", function(d) {
                    const i = d3.interpolate(this._current, d);
                    this._current = i(0);
                    return t => arc(i(t));
                })
        );

        // Создаем новую дугу для размещения метки ближе к краю.
        // Метка показывает значение, если достаточно места.
        const text = svg.selectAll("text")
            .data(arcs);

        text.join(
            enter => enter.append("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "2")
                    .attr("x", "-16")
                    .attr("font-weight", "bold")
                    .attr("font-size", fontSize)
                    .attr("fill", "#000000")
                    // .text(d => `${d.data.name}: ${d.data.value}`)),
                    .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`)),
            update => update
                .transition().duration(750)
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.select("tspan")
                    .attr("y", "2")
                    .attr("font-weight", "bold")
                    .attr("font-size", fontSize)
                    .attr("fill", "#000000")
                    // .text(d => `${d.data.name}: ${d.data.value}`))
                    .text(d => `${d.data.name}: ${(d.data.value / total * 100).toFixed(0)}%`))
        );
    };
} else if (!REFRESH) {
    console.log("Diagram (pie) module - Refresh diagram is disabled.")
} else { console.error("ERROR! Problem with refresh diagram"); };

