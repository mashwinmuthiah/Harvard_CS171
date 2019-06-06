
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering("all");

function dataFiltering(type) {
	var attractions = attractionData;
	//console.log(attractions);
	attractions = attractions.sort(function(a,b){
		return b.Visitors - a.Visitors
	})
	//console.log(attractions);
	attractions = attractions.filter(function(value,index){
		if(type=="all"){
			return true;
		}
		else if(value.Category == type){
			return true;
		}
		else {
			return false
		}
	});
	attractions = attractions.filter(function(value,index){
		 return index < 5;
	})

	//console.log(attractions);
	renderBarChart(attractions);
}
function dataManipulation(){
	var selectBox = document.getElementById("attraction-category");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	dataFiltering(selectedValue);
}
