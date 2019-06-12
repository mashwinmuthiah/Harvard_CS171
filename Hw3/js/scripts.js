
var n_data = [
    {
      "building": "Burj Khalifa",
      "country": "United Arab Emirates",
      "city": "Dubai",
      "height_m": 828,
      "height_ft": 2717,
      "height_px": 276,
      "floors": 163,
      "completed": 2010,
      "image": "1.jpg"
    },
    {
      "building": "International Commerce Centre",
      "country": "China",
      "city": "Hong Kong",
      "height_m": 484,
      "height_ft": 1588,
      "height_px": 161,
      "floors": 108,
      "completed": 2010,
      "image": "6.jpg"
    },
    {
      "building": "KK100",
      "country": "China",
      "city": "Shenzhen",
      "height_m": 442,
      "height_ft": 1449,
      "height_px": 147,
      "floors": 100,
      "completed": 2011,
      "image": "10.jpg"
    },
    {
      "building": "Makkah Royal Clock Tower",
      "country": "Saudi Arabia",
      "city": "Mecca",
      "height_m": 601,
      "height_ft": 1972,
      "height_px": 200,
      "floors": 120,
      "completed": 2012,
      "image": "2.jpg"
    },
    {
      "building": "One World Trade Center",
      "country": "United States",
      "city": "New York City",
      "height_m": 541,
      "height_ft": 1776,
      "height_px": 180,
      "floors": 94,
      "completed": 2014,
      "image": "3.jpg"
    },
    {
      "building": "Petronas Twin Towers",
      "country": "Malaysia",
      "city": "Kuala Lumpur",
      "height_m": 452,
      "height_ft": 1483,
      "height_px": 151,
      "floors": 88,
      "completed": 1998,
      "image": "7.jpg"
    },
    {
      "building": "Shanghai World Financial Center",
      "country": "China",
      "city": "Shanghai",
      "height_m": 492,
      "height_ft": 1614,
      "height_px": 164,
      "floors": 101,
      "completed": 2008,
      "image": "5.jpg"
    },
    {
      "building": "Taipei 101",
      "country": "Taiwan",
      "city": "Taipei",
      "height_m": 508,
      "height_ft": 1667,
      "height_px": 169,
      "floors": 101,
      "completed": 2004,
      "image": "4.jpg"
    },
    {
      "building": "Willis Tower",
      "country": "United States",
      "city": "Chicago",
      "height_m": 442,
      "height_ft": 1451,
      "height_px": 147,
      "floors": 108,
      "completed": 1974,
      "image": "9.jpg"
    },
    {
      "building": "Zifeng Tower",
      "country": "China",
      "city": "Nanjing",
      "height_m": 450,
      "height_ft": 1476,
      "height_px": 150,
      "floors": 66,
      "completed": 2010,
      "image": "8.jpg"
    }
  ]
console.log(n_data);

n_data.sort(function(a,b){
    return b.height_m - a.height_m;
})

var svg = d3.select("#chart-holder").append("svg")
        .attr("width",737)
        .attr("height",500);

svg.selectAll("rect")
  .data(n_data)
  .enter()
  .append("rect")
  .attr("fill","indigo")
  .attr("width",function(d,index){
      return d.height_px;
  })
  .attr("height",20)
  .attr("y",function(d,index){
    return (index * 30);
  })
  .attr("x",300)
  .on("click",function(d){
    moreInfo(d);
});

svg.selectAll("div")
    .data(n_data)
    .enter()
    .append("text")
    .text(function(d){
        return d.building;
    })
    .attr("dx",0)
    .attr("dy",function(d,index){
        return ((index+0.5)*30);
    })
    .attr("class","building-lable")
    .on("click",function(d){
        moreInfo(d);
    });

svg.selectAll("div")
    .data(n_data)
    .enter()
    .append("text")
    .text(function(d){
        return d.height_m;
    })
    .attr("dx",function(d){
        return (295+(d.height_px));
    })
    .attr("dy",function(d,index){
        return ((index+0.5)*30);
    })
    .attr("class","height-lable")
    .attr("text-anchor","end")
    .attr("fill","white")
    .on("click",function(d){
        moreInfo(d);
    });

function moreInfo(d){
    console.log(d);
    document.getElementById("building").innerHTML = d.building + "<br/>";
    document.getElementById("city").innerHTML = d.city + "<br/>";
    document.getElementById("country").innerHTML = d.country + "<br/>";
    document.getElementById("floor").innerHTML = d.floors + "<br/>";
    document.getElementById("completed").innerHTML = d.completed + "<br/>";
    a = document.getElementById("image").src = "../img/"+d.image;
    console.log(a);


}