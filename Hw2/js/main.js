

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
	var selectBox = document.getElementById("user-area");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	console.log(selectedValue);
	var selectBox2 = document.getElementById("user-order-type");
	var selectedValue2 = selectBox2.options[selectBox2.selectedIndex].value;
	console.log(selectedValue2);
	dd = dd.filter(function(value){
		if(selectedValue == "All"){
			return selectedValue;
		}
		else if(value.area == selectedValue){
			return selectedValue;
		}
		else {
			return false;
		}
	})
	dd = dd.filter(function(value){
		if(selectedValue2 == "All"){
			return selectedValue2;
		}
		else if(value.order_type == selectedValue2){
			return selectedValue2;
		}
		else {
			return false;
		}
	})
	stats(dd,fd);
	renderBarChart(dd);
}

function stats(dd,fd) {
	f = "Number of pizza deliveries :"+ dd.length+"</br>";
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
	result = f+a+b+c+d+e;
	document.getElementById("stats").innerHTML = result;
}