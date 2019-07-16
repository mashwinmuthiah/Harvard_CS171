
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
	var t= d3.transition().duration(1000);
	data.sort(function(a, b) { return b[ranks] - a[ranks]; });

	x.domain(data.map(function(d){
		return d.company;
	}));
	y.domain([0,d3.max(data.map(function(d){
		return d[ranks];
	}))]);

	yAxisGroup
		.transition(t)
		.call(yAxis);
	
	xAxisGroup
		.transition(t)
		.call(xAxis).attr("transform", "translate(" + 0 + "," + height +")");

	var rects = svg.selectAll("rect")
		.data(data,function(d){return d.company});

	rects.enter().append("rect")
		.attr("class", "bar");
	
	 // EXIT old elements not present in new data.
	// rects.exit()
    //     .attr("fill", "red")
    // .transition(t)
    //     .attr("y", y(0))
    //     .attr("height", 0)
	// 	.remove();
		
	// Update (set the dynamic properties of the elements)
	// rect
	// 	.transition()
	// 	.duration(500)
	// 	.attr("x", function(d) {
	// 		return x(d.company);
	// 	})
	// 	.attr("y", function(d) {
	// 		return y(d[ranks]);
	// 	})
	// 	.attr("width", x.bandwidth())
	// 	.attr("height", function(d) {
	// 		return height - y(d[ranks]);
	// 	});

	rects.enter()
		.append("rect")
		.attr("class","bar")
            .attr("y", y(0))
            .attr("height", 0)
            .attr("x", function(d){ return x(d.company) })
            .attr("width", x.bandwidth)
            // AND UPDATE old elements present in new data.
            .merge(rects)
            .transition(t)
                .attr("x", function(d){ return x(d.company) })
                .attr("width", x.bandwidth)
                .attr("y", function(d){ return y(d[ranks]); })
                .attr("height", function(d){ return height - y(d[ranks]); });

	// Exit
	rects.exit().remove();	
}