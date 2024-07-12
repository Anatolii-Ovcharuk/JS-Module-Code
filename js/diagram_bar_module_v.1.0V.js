/* "Diagram (bar, in value) module", v. 1.0V - 01.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

import "https://d3js.org/d3.v7.min.js";
import "./d3.v7.min.js";

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/diagram_bar_module_v.1.0.js" type="module"></script> */
/* Use "import "https://d3js.org/d3.v7.min.js";" on this is JS script OR use this line in HTML for include: <script src="./js/d3.v7.min.js"></script> <!-- <script src="https://d3js.org/d3.v7.min.js"></script> --> */
/* Use this line in HTML for include: 
    <div id="diagram_bar" style="display: flex;align-items: center;justify-content: center;"></div>
    <fieldset style="width: 200px;height: auto;margin: 20px;">
        <legend>Legend / Легенда</legend>
        <div id="diagram_bar_legend"></div>
    </fieldset>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const SORT_DATA_IN_LEGEND = true; /* That's option sort data in legend. Set: True/False */
const SORT_DATA_IN_DIAGRAM = true; /* That's option sort data in diagram. Set: True/False */
const REFRESH = true; /* That's option refresh diagram and legend each 1 seconds. Set: True/False */



// Example update and show data. Delete this for future use.
        let array = [
            { name: "Power", value: 140 },
            { name: "Water", value: 30 },
            { name: "Fuel", value: 65 },
            { name: "Gas", value: 110 },
            { name: "Oil", value: 10 },
        ];

// Example update and show data. Delete this for future use.
setInterval(() => { 
    removeDataItem("Oil");

    array[2].value += 10;
    setTimeout(() => { array[2].value -= 10 }, 2000);

    array[0].value -= 25
    setTimeout(() => { array[0].value += 25 }, 2000)

    array[1].value += 25
    setTimeout(() => { array[1].value -= 25 }, 1000)

    setTimeout(() => { array.push({ name: "Oil", value: 10 }) }, 2000);
    
    setTimeout(() => { array[4].value += 225 }, 3000)

    function removeDataItem(itemName) {
        const index = array.findIndex(d => d.name === itemName);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}, 5000);








const width = 250; // Width of the SVG container
const height = 250; // Height of the SVG container
const padding = 40; // Padding around the chart
const reservedScale = 10;
        
let dataset = array; // Data
let sortedData = [...dataset].sort((a, b) => b.value - a.value); // Sort data by value in descending order
function choiceData() { if (!REFRESH && SORT_DATA_IN_DIAGRAM) { return sortedData; } else { return dataset } };

let totalValue = d3.sum(dataset, d => d.value);
document.getElementById("legend_bar_v_total").innerText = `Total: ${totalValue}`;


        // Перевод значений в проценты
        // dataset.forEach(d => {
        //     d.percentage = (d.value / totalValue) * 100;
        // });


    // Create the SVG container
const svg = d3.select("#diagram_bar_v")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    // Create the color scale
    // const colors = d3.scaleOrdinal(d3.schemeCategory10)
        // .domain(choiceData().map(d => d.name));
            
// CREATE COLORS
  const colorsSet = [
    // "#101010", 
    "#ff8888", 
    "#f5ff88", 
    "#88ff88", 
    "#88d9ff", 
    "#8888ff",
    "rgb(236, 176, 19)",
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    // '#98df8a',
    '#d62728',
    // '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    // '#9edae5'
];
  
let initColor = function (color) {
  return d3.interpolateRgb(color, '#fff')(0.2);
};

let colors = d3.scaleOrdinal().range(
  // Recreate .schemeCategory20
colorsSet.map(initColor)
);

        // Create the scales for the x and y axes
        const xScale = d3.scaleBand()
            .domain(choiceData().map(d => d.name))
            .range([padding, width - padding])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(choiceData(), d => d.value + reservedScale)])
            // .domain([0, 100]) // Шкала от 0 до 100 для процентов
            .nice()
            .range([height - padding, padding]);

        // Create the axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        // const yAxis = d3.axisLeft(yScale)
            // .tickFormat(d => d + '%'); // Форматирование меток в проценты

        // Append the axes to the SVG container
        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height - padding})`)
            .call(xAxis);

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${padding}, 0)`)
            .call(yAxis);

        // Create the bars
                svg.append("g")
            .selectAll("rect")
            .data(choiceData())
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.name))
            .attr("y", d => yScale(d.value))
            // .attr("y", d => yScale(d.percentage)) 
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - padding - yScale(d.value))
            // .attr("height", d => height - padding - yScale(d.percentage))
            .attr("fill", d => colors(d.name))
            .style("stroke", "#ffffff")
            .style("stroke-width", "1px");

        // Add text labels to the bars
        svg.append("g")
            .selectAll("text")
            .data(choiceData())
            .enter()
            .append("text")
            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
            // .attr("y", d => yScale(d.percentage) - 5)
            .attr("y", d => yScale(d.value) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "inherit")
            .attr("font-size", "12px")
            .attr("class", "label")
            .text(d => d.value);
            // .text(d => d.percentage.toFixed(0) + '%');


/* ========================= That's code about legend ========================= */
const legend =  d3.select("#diagram_bar_legend_v").selectAll(".legend-item")
            .data(SORT_DATA_IN_LEGEND ? sortedData : dataset)
            .enter().append("div")
            .attr("class", "legend-item");

    legend.append("div")
            .attr("class", "legend-bar-color")
            .style("background-color", d => colors(d.name))
            .style("width", "20px")
            .style("height", "20px")
            .style("margin", "4px 8px");

    legend.append("p")
        // .text(d => `${d.name}: ${(d.value / d3.sum(data.map(d => d.value)) * 100).toFixed(0)}%`);
        .text(d => `${d.name}: ${d.value}`);
        
    // d3.select("#diagram_bar_legend_v").append("p").attr("class", "legend-total");
// document.getElementById("legend-total").innerHTML = `Total: ${totalValue}`;




if (REFRESH) {
    setInterval(() => {
            let data = dataset;

            if (SORT_DATA_IN_DIAGRAM || SORT_DATA_IN_LEGEND) {
                sortedData = [...dataset].sort((a, b) => b.value - a.value); // Sort data by value in descending order
            }
            
            if (SORT_DATA_IN_DIAGRAM) {
                data = sortedData;
            } else if (!SORT_DATA_IN_DIAGRAM) {
                data = dataset;
            } else { console.error("Error with options value!") };

            totalValue = d3.sum(data, d => d.value);
            document.getElementById("legend_bar_v_total").innerText = `Total: ${totalValue}`;

            data.forEach(d => {
                d.percentage = (d.value / totalValue) * 100;
            });

            xScale.domain(data.map(d => d.name));
            yScale.domain([0, d3.max(data, d => d.value + reservedScale)])
    
            svg.select("#x-axis").call(xAxis);
            svg.select("#y-axis").call(yAxis);

            const bars = svg.selectAll(".bar")
                .data(data, d => d.name);

            bars.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => xScale(d.name))
                .attr("y", d => yScale(d.percentage))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - padding - yScale(d.percentage))
                .attr("fill", d => colors(d.name))
                .merge(bars)
                .transition()
                .duration(1000)
                .attr("x", d => xScale(d.name))
                // .attr("y", d => yScale(d.percentage))
                .attr("y", d => yScale(d.value))
                .attr("height", d => height - padding - yScale(d.value))
                // .attr("height", d => height - padding - yScale(d.percentage))
                .attr("fill", d => colors(d.name))
                .style("stroke", "#ffffff")
                .style("stroke-width", "1px");;

            bars.exit().remove();

            const labels = svg.selectAll(".label")
                .data(data, d => d.name);

            labels.enter()
                .append("text")
                .attr("class", "label")
                .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
                // .attr("y", d => yScale(d.percentage) - 5)
                .attr("y", d => yScale(d.value) - 5)
                .attr("text-anchor", "middle")
                .attr("fill", "inherit")
                .attr("font-size", "12px")
                .merge(labels)
                .transition()
                .duration(1000)
                .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
                // .attr("y", d => yScale(d.percentage) - 5)
                .attr("y", d => yScale(d.value) - 5)
                // .text(d => d.percentage.toFixed(0) + '%');
                .text(d => d.value);

            labels.exit().remove();
            

            // const legend = d3.select("#diagram_bar_legend").selectAll(".legend-item")
            //     .data(data, d => d.name);

            const legend = d3.select("#diagram_bar_legend_v")
                .selectAll(".legend-item")
                .data(SORT_DATA_IN_LEGEND ? sortedData : dataset);
        
            const legendEnter = legend.enter().append("div")
                .attr("class", "legend-item");

            legendEnter.append("div")
                .attr("class", "legend-bar-color")
                .style("background-color", d => colors(d.name))
                .style("width", "20px")
                .style("height", "20px")
                .style("margin", "4px 8px");

            legendEnter.append("p");

            legendEnter.merge(legend)
                .select("p")
                .text(d => `${d.name}: ${d.value}`);
                
            legendEnter.merge(legend)
                .select(".legend-bar-color")
                .style("background-color", d => colors(d.name));
                

            legend.exit().remove();
    
}, 1000)
} else if (!REFRESH) {
    console.log("Diagram (bar, in value) module - Refresh diagram is disabled.")
} else { console.error("ERROR! Problem with refresh diagram"); };




