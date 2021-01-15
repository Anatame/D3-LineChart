var data = [{
        date: "10/25/2018",
        value: 1,
        value1: 5
    },
    {
        date: "10/25/2018",
        value: 1,
        value1: 5
    },
    {
        date: "10/26/2018",
        value: 5,
        value1: 15
    },
    {
        date: "10/27/2018",
        value: 6,
        value1: 45
    },
    {
        date: "10/28/2018",
        value: 40,
        value1: 42
    },
    {
        date: "10/29/2018",
        value: 50,
        value1: 62
    },
    {
        date: "10/30/2018",
        value: 55,
        value1: 5
    },
    {
        date: "10/31/2018",
        value: 60,
        value1: 5
    },
    {
        date: "11/01/2018",
        value: 62,
        value1: 5
    },
]

var margin = 50;
var height = 760;
var width = 1024;

dataGroup = d3.select('body')
    .append('svg')
    .attr('width', width + margin)
    .attr('height', height + 2 * margin)
    .append('g')
    .attr('transform', 'translate(' + margin + ',' + margin + ')')

var parseTime = d3.timeParse('%m/%d/%Y')

data.forEach((d) => {
    d.date = parseTime(d.date)
})

var x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

var y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([height, 0]);

var propertyNames = [];

for (var name in data[0]) {
    if (name == 'date') {
        continue
    }
    propertyNames.push(name)
}

var color = ['red', 'blue']

plotVariable(propertyNames[0], color[0]);
plotVariable(propertyNames[1], color[1]);

var xAxisGroup = dataGroup.append('g')
    .attr('class', 'xAxisGroup')
    .attr('transform', 'translate(0,' + height + ')')

var xAxis = d3.axisBottom(x)
    .tickFormat(d3.timeFormat('%Y-%m-%d'))
  

xAxis(xAxisGroup);

var yAxisGroup = dataGroup.append('g')
    .attr('class', 'yAxisGroup')


var yAxis = d3.axisLeft(y)

yAxis(yAxisGroup);


function plotVariable(propertyName, color) {

    var line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d[propertyName]))

    dataGroup.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('d', line);
}