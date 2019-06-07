

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();



function createVisualization() {
	dd = deliveryData;
	fd = feedbackData;
	stats(dd,fd)
}

function stats(dd,fd) {
	console.log(fd);
	console.log("Number of pizza deliveries :", dd.length);
	count = 0;
	avg_dtime = 0;
	sales = 0;
	count_high = 0;
	count_low = 0;
	count_med = 0;
	dd.forEach(function(element) {
		count += element.count;
		avg_dtime += element.delivery_time;
		sales += element.price;
	});
	a = "Number of all delivered pizzas :" + count +"</br>";
	b = "Average delivery time :"+avg_dtime/dd.length+"</br>";
	c = "Total sales in USD :"+sales+"</br>";
	d = "Number of all feedback entries :"+fd.length+"</br>";
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(d);

	fd.forEach(function(element){ // Display dataset summary
		if(element.quality == "medium"){
			count_med += 1;
		}
		else if(element.quality == "low"){
			count_low += 1;
		}
		else if(element.quality == "high"){
			count_high += 1;
		}
	});
	e = "Number of feedback entries per quality category :"+" High:"+ count_high+ " Medium:"+ count_med+ " Low:"+ count_low+"</br>";
	console.log(e);
	result = a+b+c+d+e;
	document.getElementById("stats").innerHTML = result;
}