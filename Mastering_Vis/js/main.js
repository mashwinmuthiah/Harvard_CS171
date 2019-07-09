d3.json("/data/ages.json").then(function(data){
    data.forEach(element => {
        element.age = +element.age
    });
    console.log(data);
    renderChart(data);
});

function renderChart(data){
    var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);

    var circle = svg.selectAll("circle")
        .data(data)
        .enter()
            .append("circle")
            .attr("cx",(d,i) =>{
            return i*50+25;
             })
            .attr("cy",200)
            .attr("r",(d,i)=>{
                 return d.age *2;
                })
            .attr("fill",(d,i)=>{
                if(d.name == "Tony"){
                    return "blue";
                }
                else{
                    return "red";
                }
            });
} 