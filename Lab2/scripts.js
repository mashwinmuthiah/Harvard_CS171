var amus_park = [
    {"id":1,
    "name":"park_a",
    "price_in_usd":10,
    "opening_days":["Monday","Wednesday","Friday"],
    "limited_access_to_children":"N"
    },
    {"id":2,
    "name":"park_b",
    "price_in_usd":15,
    "opening_days":["Friday","Saturday","Sunday"],
    "limited_access_to_children":"Y"
    },
    {"id":3,
    "name":"park_c",
    "price_in_usd":20,
    "opening_days":["Saturday","Sunday"],
    "limited_access_to_children":"N"
    }
];

console.log(amus_park[0].name);
console.log(amus_park[1].opening_days);
console.log(amus_park[1].opening_days[0]);
console.log(amus_park[2].price_in_usd/2 + "$");
