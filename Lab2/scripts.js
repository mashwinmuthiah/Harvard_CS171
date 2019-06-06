//Activity - 1
var amus_park = [
    {"id":1,
    "name":"Roller Coster",
    "price_in_usd":10,
    "opening_days":["Monday","Wednesday","Friday"],
    "limited_access_to_children":"N"
    },
    {"id":2,
    "name":"Water slider",
    "price_in_usd":15,
    "opening_days":["Friday","Saturday","Sunday"],
    "limited_access_to_children":"Y"
    },
    {"id":3,
    "name":"Priate Ship",
    "price_in_usd":20,
    "opening_days":["Saturday","Sunday"],
    "limited_access_to_children":"N"
    }
];

console.log(amus_park[0].name);
console.log(amus_park[1].opening_days);
console.log(amus_park[1].opening_days[0]);
console.log(amus_park[2].price_in_usd/2 + "$");

//Activity - 2
function doublePrice(amus_p){
    for(var i=0;i<amus_p.length;i++)
    { if(i!==1){
        amus_p[i].price_in_usd = amus_p[i].price_in_usd*2;
    }}
    return amus_p
}

var amusementRidesDouble = doublePrice(amus_park);
console.log(amusementRidesDouble);

/* function double(amus){
    amus.forEach(function(element,index){
        element.price_in_usd = element.price_in_usd*5;
        console.log(element);
    });
    return amus;
}
double(amus_park); */

function debugAmusementRides(array_1){
    array_1.forEach(function(element,index) {
        console.log(element.name + " " + element.price_in_usd)
    });
}

debugAmusementRides(amusementRidesDouble);

function website_display(array_2){
    var result_array=[];
    for(i=0;i<array_2.length;i++){
        result = array_2[i].name+" "+array_2[i].price_in_usd+"$"+"<br/>";
        result_array+=result;
    }
    console.log(result_array);
    document.getElementById("lab2_a2").innerHTML = result_array;
}

website_display(amusementRidesDouble);

//Activity - 3 

