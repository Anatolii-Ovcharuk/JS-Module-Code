/* "Diagram (bar, in percent) module", v. 1.1 - 11.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

import "https://d3js.org/d3.v7.min.js";
import "./d3.v7.min.js";

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/diagram_bar_module_v.1.0.js" type="module"></script> */
/* Use "import "https://d3js.org/d3.v7.min.js";" on this is JS script OR use this line in HTML for include: <script src="./js/d3.v7.min.js"></script> <!-- <script src="https://d3js.org/d3.v7.min.js"></script> --> */
/* Use this line in HTML for include: 
    <div id="diagram_bar_p" style="display: flex;align-items: center;justify-content: center;"></div>
    <fieldset style="width: 200px;height: auto;margin: 20px;">
        <legend>Legend / Легенда</legend>
        <div id="diagram_bar_legend_p"></div>
        <p id="legend_bar_p_total"></p>
    </fieldset>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

    /* OPTIONS */
const SORT_DATA_IN_LEGEND = true; /* That's option sort data in legend. Set: True/False */
const SORT_DATA_IN_DIAGRAM = true; /* That's option sort data in diagram. Set: True/False */
const REFRESH = true; /* That's option refresh diagram and legend each 1 seconds. Set: True/False */
const SHOW_IN_PERCENT_DIAGRAM = false; /* That's option show in diagram data value in percent. Set: True/False */
const SHOW_IN_PERCENT_LEGEND = true; /* That's option show in diagram data value in legend. Set: True/False */
const CUSTOM_COLORS = true; /* That's option show in diagram and legend customs colors. Set: True/False */
const STROKE_BARS = false; /* That's option show border for bars. Set: True/False */
const METRIC_VALUE = '';  /* Add metric for value in legend. Default string is empty - "" */

// CUSTOM COLORS (Array)
  const colorsSet = [ "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff", "rgb(236, 176, 19)", '#1f77b4', '#aec7e8', 
  '#ff7f0e', '#ffbb78', '#2ca02c', '#d62728', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', 
  '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', ]; // Other example colors: "#101010", '#98df8a', '#9edae5', '#ff9896',


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
        
let dataset = array; // Set Data here in object - {"name": *data*, "value": *data*};
let totalValue = d3.sum(dataset, d => d.value);

// Перевод значений в проценты
dataset.forEach(d => {
    d.percentage = (d.value / totalValue) * 100;
});


let sortedData = [...dataset].sort((a, b) => b.value - a.value); // Sort data by value in descending order

function choiceData() {
    if (SORT_DATA_IN_DIAGRAM) {
        return sortedData;
    } else {
        return dataset
    };
};

document.getElementById("legend_bar_total").innerText = `Total: ${totalValue} ${METRIC_VALUE}`;



    // Create the SVG container
const svg = d3.select("#diagram_bar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


  
let initColor = function (color) {
  return d3.interpolateRgb(color, '#fff')(0.2);
};

let colors = null

if (CUSTOM_COLORS) {
    //   Recreate .schemeCategory20
    colors = d3.scaleOrdinal().range(
        colorsSet.map(initColor)
    );
} else {
    // Create the color scale
    colors = d3.scaleOrdinal(d3.schemeCategory10).domain(choiceData().map(d => d.name));    
};



        // Create the scales for the x and y axes
        const xScale = d3.scaleBand()
            .domain(choiceData().map(d => d.name))
            .range([padding, width - padding])
            .padding(0.1);

        const yScale = d3.scaleLinear()

        // Create the axes
        const xAxis = d3.axisBottom(xScale);
        // const yAxis = d3.axisLeft(yScale);
        const yAxis = d3.axisLeft(yScale);
        
        if (SHOW_IN_PERCENT_DIAGRAM) {
            yAxis.tickFormat(d => d + '%'); // Форматирование меток в проценты
            yScale.domain([0, 100]) // Шкала от 0 до 100 для процентов
            .nice()
            .range([height - padding, padding]);
        } else {
            yAxis.tickFormat(d => d); // Форматирование меток в значение
            yScale.domain([0, d3.max(choiceData(), d => d.value + reservedScale)])
            .nice()
            .range([height - padding, padding]);
        };
            

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
            .attr("class", "bars")
            .selectAll("rect")
            .data(choiceData())
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.name))
            .attr("y", d => SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value) - 1) 
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - padding - (SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value)))
            .attr("fill", d => colors(d.name))
            .style("stroke", "#ffffff")
            .style("stroke-width", STROKE_BARS ? "1px" : "0px");

        // Add text labels to the bars
        svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(choiceData())
            .enter()
            .append("text")
            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
            .attr("y", d => (SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value)) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "inherit")
            .attr("font-size", "12px")
            .attr("class", "label")
            .text(d => (SHOW_IN_PERCENT_DIAGRAM ? d.percentage.toFixed(0) + '%' : d.value));


/* ========================= That's code about legend ========================= */
function setDataLegend() {
    if (SORT_DATA_IN_LEGEND) { return sortedData } else { return dataset };
}

const legend =  d3.select("#diagram_bar_legend").selectAll(".legend-item")
            .data(setDataLegend())
            .enter().append("div")
            .attr("class", "legend-item");

    legend.append("div")
            .attr("class", "legend-bar-color")
            .style("background-color", d => colors(d.name))
            .style("width", "20px")
            .style("height", "20px")
            .style("margin", "4px 8px");

    legend.append("p")
        .text(d => SHOW_IN_PERCENT_LEGEND ? `${d.name}: ${(d.value / d3.sum(setDataLegend().map(d => d.value)) * 100).toFixed(0)}%` : `${d.name}: ${d.value} ${METRIC_VALUE} ` );
        
    // d3.select("#diagram_bar_legend").append("p").attr("class", "legend-total");
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
    } else {
        console.error("Error with options value!");
    }

    totalValue = d3.sum(data, d => d.value);
    document.getElementById("legend_bar_total").innerText = `Total: ${totalValue} ${METRIC_VALUE}`;

    data.forEach(d => {
        d.percentage = (d.value / totalValue) * 100;
    });

    xScale.domain(data.map(d => d.name));

if (SHOW_IN_PERCENT_DIAGRAM) {
    yAxis.tickFormat(d => d + '%'); // Форматирование меток в проценты
    yScale.domain([0, 100]) // Шкала от 0 до 100 для процентов
    .nice()
    .range([height - padding, padding]);
} else {
    yAxis.tickFormat(d => d); // Форматирование меток в значение
    yScale.domain([0, d3.max(choiceData(), d => d.value + reservedScale)])
    .nice()
    .range([height - padding, padding]);
};

    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);

    // Обновление столбиков
    // const bars = svg.selectAll(".bar")
    //     .data(data, d => d.name);
    
    const barslist = d3.select("#diagram_bar").select("svg").select(".bars").selectAll(".bar").data(data, d => d.name);
            
    barslist.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.percentage))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - padding - yScale(d.percentage))
        .attr("fill", d => colors(d.name))
        .style("stroke", "#ffffff")
        .style("stroke-width", STROKE_BARS ? "1px" : "0px")
        .merge(barslist)
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d.name))
        .attr("y", d => SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value) - 1) 
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - padding - (SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value)))
        .attr("fill", d => colors(d.name));


    barslist.exit().remove(); // Удаление лишних столбиков

    // Обновление меток
    // const labels = svg.selectAll(".label")
    //     .data(data, d => d.name);
    
    const labelslist = d3.select("#diagram_bar").select("svg").select(".labels").selectAll(".label").data(data, d => d.name);

    labelslist.enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => (SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value)) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "inherit")
        .attr("font-size", "12px")
        .attr("class", "label")
        .merge(labelslist)
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => (SHOW_IN_PERCENT_DIAGRAM ? yScale(d.percentage) : yScale(d.value)) - 5)
        .text(d => (SHOW_IN_PERCENT_DIAGRAM ? d.percentage.toFixed(0) + '%' : d.value));
    

    labelslist.exit().remove(); // Удаление лишних меток


    // Обновление легенды
    const legend = d3.select("#diagram_bar_legend")
        .selectAll(".legend-item")
        .data(setDataLegend());

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
        .text(d => SHOW_IN_PERCENT_LEGEND ? `${d.name}: ${(d.value / d3.sum(setDataLegend().map(d => d.value)) * 100).toFixed(0)}%` : `${d.name}: ${d.value} ${METRIC_VALUE}` );

    legendEnter.merge(legend)
        .select(".legend-bar-color")
        .style("background-color", d => colors(d.name));

    legend.exit().remove(); // Удаление лишних элементов легенды

}, 1000);
} else if (!REFRESH) {
    console.log("Diagram (bar) module - Refresh diagram is disabled.")
} else { console.error("ERROR! Problem with refresh diagram."); };

