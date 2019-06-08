/* main JS file */

console.log("Hello JS world!");

var svg = d3.select("body").append("div").append("svg")
    .attr("width",400)
    .attr("height",200);

var rec = svg.append("rect")
        .attr("fill","green")
        .attr("width",400)
        .attr("height",200)
        .attr("y",0)
        .attr("x",5);

 var dy_el = d3.select("body").append("div").text("Dyanmic Content");

 var svg2 = d3.select("body").append("svg")
    .attr("width",200)
    .attr("height",50);

 var sandwiches = [
      { name: "Thesis", price: 7.95, size: "large" },
      { name: "Dissertation", price: 8.95, size: "large" },
      { name: "Highlander", price: 6.50, size: "small" },
      { name: "Just Tuna", price: 6.50, size: "small" },
      { name: "So-La", price: 7.95, size: "large" },
      { name: "Special", price: 12.50, size: "small" }
 ];

svg2.selectAll("circle")
    .data(sandwiches)
    .enter()
    .append("circle")
    .attr("fill",function(d,index){
        if(d.price <= 7.00){
            return "yellow";
        }
        else return "green";
    })
    .attr("cx",function(d,index){
        return((index+1)*30);
    })
    .attr("cy",30)
    .attr("r",function(d,index){
        if (d.size == "large"){
            return 10
        }
        else if(d.size == "small"){
            return 5
        }
    })
    .attr("stroke","black");

    d3.csv("/data/cities.csv",function(d){
        console.log("Data loaded Completed !!");
        console.log(d);
        count = 0;
        d.forEach(function(element) {
            element.population = Number(element.population);
            element.x = Number(element.x);
            element.y = Number(element.y);
            if(element.eu == "true"){
                element.eu = true;
                count +=1;
            }
            else element.eu = false;
        });
        d = d.filter(function(value,index){
            return (value.eu == true);
        })
        console.log(d)

        d3.select("body").append("p").text("Number of EU countries :" + count);

        renderScatter(d);
    })

function renderScatter (d){
    var svg3 = d3.select("body").append("svg")
    .attr("width",700)
    .attr("height",550);

    var scatter = svg3.selectAll("circle")
                    .data(d)
                    .enter()
                    .append("circle")
                    .attr("fill","brown")
                    .attr("cx",function(d,index){
                        return d.x;
                    })
                    .attr("cy",function(d,index){
                        return d.y;
                    })
                    .attr("r",function(d){
                        if (d.population < 1000000){
                            return 4;
                        }
                        else return 8;
                    });
    svg3.selectAll("rect")
        .data(d)
        .enter()
        .append("text")
        .text(function(d){
            return d.city;
        })
        .attr("dx",function(d,index){
            return d.x;
        })
        .attr("dy",function(d,index){
            return d.y - 15;
        })
        .attr("opacity",function(d,index){
            return d.population < 1000000 ? 0.00 : 1.00;
        })
        .attr("class","City-label");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) { return d.toFixed(2) })
            .direction('nw')
            .offset([0, 3]);
}