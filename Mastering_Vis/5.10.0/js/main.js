    
/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

var margin = {left:80, right:20, top:50, bottom:100}
var height = 500 - margin.top - margin.bottom;
var width = 800 - margin.left - margin.right;

// creating SVG
var g = d3.selectAll("#chart-area").append("svg")
	.attr("width",width + margin.left + margin.right)
	.attr("height",height + margin.top + margin.bottom)
	.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");

// Creating Scales - The domains will be set indise the data load function

 var xScale = d3.scaleLog()
	.base(10)
	.range([0,width]);

var yScale = d3.scaleLinear()
	.range([0,90]);

var areaScale = d3.scaleLinear()
	.range([25*Math.PI,1500*Math.PI]);

var colorScale = d3.scaleOrdinal(d3.schemePastel11);

// Creating Labels

var xLabel = g.append("text")
	.attr("y",height + 50)
	.attr("x",width/2)
	.attr("font-size", "20px")
    .attr("text-anchor", "middle")
	.text("GDP per capita in $(USD)");

var yLabel = g.append("text")
	.attr("y",-40)
	.attr("x",-170)
	.attr("font-size", "20px")
    .attr("text-anchor", "middle")
	.attr("transform","rotate(-90)")
	.text("Life Expectancy in Years");

var timeLabel = g.append("text")
	.attr("y",height - 10)
	.attr("x",width/1.10)
	.attr("font-size", "40px")
	.attr("text-anchor", "middle")
	.attr("opacity",0.4)
	.text("1800");

// Creating X and Y axis 

var Xaxis = d3.axisBottom(xScale)
	.tickValues([400,4000,40000])
	.tickFormat(d3.format("$"));

g.append("g")
	.attr("class","x-axis")
	.attr("transform","translate(0," +height+")")
	.call(Xaxis);

var Yaxis = d3.axisLeft(yScale)
	.tickFormat(function(d){return +d;});

g.append("g")
	.attr("class","y-axis")
	.call(Yaxis);

// Loading Data 

d3.json("/data/data.json").then(function(data){
	console.log(data);
})
