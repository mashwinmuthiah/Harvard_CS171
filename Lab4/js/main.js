
// SVG Size
var width = 700,
	height = 500;
var padding = 30;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	console.log("Countries: " + data.length)
	data  = typechange(data); 
	console.log(data);
	renderChart(data);

});

function typechange(data){ 
	// Type converting Income , population and LifeExpectancy 

	data.forEach(element => {
		element["Income"] = parseFloat(element["Income"]);
		element.LifeExpectancy = parseFloat(element.LifeExpectancy);
		element.Population = parseInt(element.Population);
		
	});
	return data;
}

function renderChart(data){

	data.sort(function(a,b){
		return b.Population - a.Population;
	})
	var svg = d3.select("#chart-area")
			.append("svg")
			.attr("width",width)
			.attr("height",height);
	
	var incomeScale = d3.scaleLinear()
			.domain([d3.min(data,function(d){  return d.Income   }) - 100 ,d3.max(data,function(d){return d.Income}) - 100 ])
			.range([padding , width - padding]);
	console.log(incomeScale(5000));

	var LifeExpectancyScale = d3.scaleLinear()
			.domain([d3.min(data,function(d){ return d.LifeExpectancy }) - 5 ,d3.max(data,function(d){ return d.LifeExpectancy }) ])
			.range([height - padding ,padding ]);
	console.log(LifeExpectancyScale(68));

	var radiusScale = d3.scaleLinear()
			.domain([d3.min(data,function(d){ return d.Population }) - 5 ,d3.max(data,function(d){ return d.Population }) ])
			.range([4,30]);

	var regions = [];
	data.forEach(function(element){
		regions.push(element.Region);
	})
	var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
	colorScale.domain(regions);
	svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("fill",function(d){
				return colorScale(d.Region);
			})
			.attr("stroke","black")
			.attr("cx",function(d){
				return incomeScale(d.Income);
			})
			.attr("cy",function(d){
				return LifeExpectancyScale(d.LifeExpectancy);
			})
			.attr("r",function(d){
				return radiusScale(d.Population);
			})
			.style("opacity", .6);


	var xAxis = d3.axisBottom().scale(incomeScale)
				.ticks(10);

	var yAxis = d3.axisLeft().scale(LifeExpectancyScale)
				.ticks(8)
				.tickValues([45,50,55,60,65,70,75,80]);

	svg.append("g")
			.attr("class","axis x-axis")
			.attr("transform","translate(0,"+(height-padding)+")")
			.call(xAxis);
	
	svg.append("g")
			.attr("class","axis y-axis")
			.attr("transform","translate(" + (padding) +",0)")
			.call(yAxis);
	
	svg.append("g").append("text").text("Income")
			.attr("class","x-axis-name")
			.attr("y",height)
			.attr("x",width/2)	
	svg.append("g").append("text").text("Life Expectancy")
			.attr("class","y-axis-name")
			.attr("y",height/2)
			.attr("x",0);
	
}
