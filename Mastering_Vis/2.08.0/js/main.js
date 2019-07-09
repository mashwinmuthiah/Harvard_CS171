/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("/data/buildings.json").then(function(data){
    data.forEach(element => {
        element.height = +element.height;        
    });
    console.log(data);
    renderChart(data);
});

function renderChart(data){
    var svg = d3.select("#chart-area").append("svg")
        .attr("width",400)
        .attr("height",400);
    var bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x",function(d,i){
                return i*40+25;
            })
            .attr("y",5)
            .attr("width",28)
            .attr("height",function(d,i){
                return d.height;
            })
            .attr("fill","grey")
};