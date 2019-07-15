
// The function is called every time when an order comes in or an order gets processed
// The current order queue is stored in the variable 'orders'
var texts = d3.select("#chart-area").append("p")

var svg = d3.select("#chart-area").append("svg")
			.attr("width",600)
			.attr("height",200);

function updateVisualization(orders) {
	console.log(orders);

	var circle = svg.selectAll("circle")
		.data(orders,function(d){return d;});

		circle.enter()
		.append("circle")
		.merge(circle)
		.attr("cx",function(d,i){
			return i*45+50;
		})
		.attr("cy",20)
		.attr("r",20)
		.attr("fill",function(d){
			if (d.product == "tea") {
				return "grey";
			} 
			else return "brown";
		})

		circle.exit().remove();

	texts.text("Orders : " + orders.length);

}