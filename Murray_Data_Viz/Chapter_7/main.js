var dataset = [ 100, 200, 300, 400, 500 ];
console.log(dataset);

var scale = d3.scaleLinear();


scale.domain([100,500]);
scale.range([10,350]);
console.log(scale(101));

var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
  ];

console.log(dataset);

console.log(d3.max(dataset,function(d){
    return(d[0]);
}))

var w = 500;
var h = 500;

var xscale = d3.scaleLinear()
                .domain([0,d3.max(dataset,function(d){ return d[0]; })])
                .range([0,w]);

                
var yscale = d3.scaleLinear()
                .nice().domain([0,d3.max(dataset,function(d){ return d[1]; })])
                .range([0,h]);

var parseTime = d3.timeParse("%m/%d/%Y");

console.log(parseTime("02/20/2019"))


