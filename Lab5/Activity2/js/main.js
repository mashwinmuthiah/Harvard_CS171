
// SVG drawing area

var margin = { top: 40, right: 10, bottom: 60, left: 60 };

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scales
var x = d3.scaleBand()
    .rangeRound([0,width])
	.paddingInner(0.1);

var y = d3.scaleLinear()
	.range([height,0]);
	
var yAxis = d3.axisLeft()
	.scale(y);
var yAxisGroup = svg.append("g")
	.attr("class", "y-axis axis");

var xAxis = d3.axisBottom()
	.scale(x);
var xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis");

// Initialize data
loadData();

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
	// data getter
	get: function() { return _data; },
	// data setter
	set: function(value) {
		_data = value;
		// update the visualization each time the data property is set by using the equal sign (e.g. data = [])
		updateVisualization()
	}
});

// Load CSV file
function loadData() {
	d3.csv("data/coffee-house-chains.csv", function(error, csv) {

		csv.forEach(function(d){
			d.revenue = +d.revenue;
			d.stores = +d.stores;
		});

		// Store csv data in global variable
		data = csv;
		console.log(data);
	    // updateVisualization gets automatically called within the data = csv call;
		// basically(whenever the data is set to a value using = operator);
		// see the definition above: Object.defineProperty(window, 'data', { ...
	});
}
var ranks = d3.select("#ranking-type") .property("value")

console.log(ranks);

d3.select("#ranking-type").on("change",function(){
	ranks = d3.select("#ranking-type") .property("value");
	console.log(ranks);
	updateVisualization()
})

// Render visualization
function updateVisualization() {
	console.log(data);
	data.sort(function(a, b) { return b[ranks] - a[ranks]; });
	x.domain(data.map(function(d){
		return d.company;
	}));
	y.domain([0,d3.max(data.map(function(d){
		return d[ranks];
	}))]);

	svg.select(".y-axis")
		.transition()
		.duration(1000)
		.call(yAxis);
	
	svg.select(".x-axis")
		.transition()
		.duration(1000)
		.call(xAxis).attr("transform", "translate(" + 0 + "," + height +")");

	var bars = svg.selectAll("rect")
		.data(data,function(d){return d;});
	
	bars.enter()
		.append("rect")
		.attr("class","bar")
		.transition()
		.duration(1000)
		.attr("x", function(d) { return x(d.company); })
  		.attr("y", function(d) { return y(d[ranks]); })
  		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - y(d[ranks]); });

	bars.exit().remove();
}