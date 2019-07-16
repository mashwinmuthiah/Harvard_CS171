
// SVG drawing area

var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 600 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Date parser
var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");

// Transaction
var t = d3.transition().duration(3000);

// X axis group
var xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

// Y axis group
var yAxisGroup = svg.append("g")
	.attr("class", "y axis");
// X Scale
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

// Y Scale
var y = d3.scaleLinear()
	.range([height, 0]);

// Initialize data
loadData();

// FIFA world cup
var data;

// Load CSV file
function loadData() {
	d3.csv("data/fifa-world-cup.csv", function(error, csv) {
		csv.forEach(function(d){
			// Convert string to 'date object'
			d.YEAR = parseDate(d.YEAR);
			
			// Convert numeric values to 'numbers'
			d.TEAMS = +d.TEAMS;
			d.MATCHES = +d.MATCHES;
			d.GOALS = +d.GOALS;
			d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
			d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
		});

		// Store csv data in global variable
		data = csv
		// Draw the visualization for the first time
		updateVisualization();
	});
}

var ranks = d3.select("#selection").property("value");
console.log(ranks);

d3.select("#selection").on('change',function(){
	ranks = d3.select("#selection").property("value");
	console.log(ranks)
	updateVisualization()
})

// Render visualization
function updateVisualization() {

	console.log(data);
	data.sort(function(a,b){
		return formatDate(a.YEAR) - formatDate(b.YEAR);
	})
	// X scale domain
	x.domain(data.map(function(d){
		return formatDate(d.YEAR);
	}));

	// Y scale domain
	y.domain([0,d3.max(data,function(d){
		return d[ranks];
	})]);

	// Drawing lines 
	var line = d3.line()
	.x(function(d){
		return x(formatDate(d.YEAR))
	})
	.y(function(d){
		return y(d[ranks]);
	});	

	var linePath = svg.selectAll(".line").data([data],function(d){
		return d.year;
	}); 

	linePath.enter().append("path")
	.attr("class", "line")
	.merge(linePath)
	.transition(t)
	.attr("d",line(data));

	linePath.exit().transition(t).remove();

	var tool_tip = d3.tip().attr("class","d3-tip").html(function(d){
		return (d.EDITION +"<br>" + ranks +" : "+ d[ranks]);
	})
	svg.call(tool_tip);
	//Drawing the circles for the tip

	var circle = svg.selectAll("circle")
		.data(data,function(d){
			return d.YEAR;
		});

	circle.enter().append("circle")
	.attr("fill","olive")
	.attr("r",3.5)
	.on("mouseover", tool_tip.show)
	.on("mouseout", tool_tip.hide)
	.merge(circle)
	.transition(t)
	.attr("cx",function(d){
		return x(formatDate(d.YEAR));
	})
	.attr("cy",function(d){
		return y(d[ranks]);
	});

	circle.exit().transition(t).remove();

	// Appending Axis 
	var xaxis = d3.axisBottom(x);
	xAxisGroup.transition(t).call(xaxis);
	var yaxis = d3.axisLeft(y);
	yAxisGroup.transition(t).call(yaxis);

}

// Show details for a specific FIFA World Cup
function showEdition(d){
	
}
