var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);

var data = [25,30,35,40,45,50];

var circle = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx",(d,i) =>{
            return i*50+25;
        })
        .attr("cy",200)
        .attr("r",(d,i)=>{
            return d;
        })
        .attr("fill","blue")
