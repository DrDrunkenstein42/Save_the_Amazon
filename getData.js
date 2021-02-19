// get product category
var x = document.getElementsByName("description")[0].content.toLowerCase();
var category = "";
if (x.includes("book")) {
  category = "books";
} else if (x.includes("home")) {
  category = "furniture";
} else if (x.includes("electronics")) {
  category = "electronics";
}

if (category === "") {
  x = document.getElementById("nav-subnav");
  if (x.dataset.category === "apparel") {
    category = "clothing";
  }
}

function extractPincode(address) {
  if (address.length < 6) {
    return null;
  }
  for (var i=0; i<address.length-6; i++) {
    if (/^\d+$/.test(address.substring(i, i+6))) {
      return address.substring(i, i+6);
    }
  }
  return null;
}

// get product materials in case of furniture or clothing
const furnitureMats = ["wood", "plastic"];
const clothMats = ["cotton", "polyester", "leather", "silk", "wool", "denim"];

var matsUsed = [];
var info = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini")[0];
if (category === "clothing") {
  for (var i=0; i<clothMats.length; i++) {
    if (info.innerHTML.toLowerCase().includes(clothMats[i])) {
      matsUsed.push(clothMats[i]);
    }
  }
} else if (category === "furniture") {
  for (var i=0; i<furnitureMats.length; i++) {
    if (info.innerHTML.toLowerCase().includes(furnitureMats[i])) {
      matsUsed.push(furnitureMats[i]);
    }
  }
}

// get product weight, country of origin. get pincode of  manufacturer if in India
var weight = 0;
var origin = "";
var manufacturer = "";

if (category === "books" || category === "clothing") {
  var details = document.getElementsByClassName("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list")[0];
  for (var i=0; i<details.children.length; i++) {
    if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.children[i].children[0].children[1].innerHTML.toLowerCase();
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.children[i].children[0].children[1].innerHTML.toLowerCase();
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("manufacturer")) {
      manufacturer = extractPincode(details.children[i].children[0].children[1].innerHTML.toLowerCase());
    }
  }
} else {
  var details = document.getElementById("productDetails_techSpec_section_1");
  for (var i=0; i<details.rows.length; i++) {
    if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.rows[i].cells[1].innerHTML.toLowerCase();
    } else if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.rows[i].cells[1].innerHTML.toLowerCase();
    } else if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("manufacturer")) {
      manufacturer = extractPincode(details.rows[i].cells[1].innerHTML.toLowerCase());
    }
  }
}

// get shipping pincode (you have to be signed in)
var address = document.getElementsByClassName("nav-line-2 nav-progressive-content")[0].innerHTML;
address = extractPincode(address);

//get weight as integer in grams
if (weight.includes("Kilograms")) {
  weight = parseInt(weight.substring(0, weight.length-10));
} else {
  weight = parseInt(weight.substring(0, weight.length-2));
}



import codes from "./pincodes";
import countries from "./countries"
const waterDistanceConst = 2;

function calculateShippingPollution(weight, origin, dest, manufacturer=null) {
  const carbonShipping = 0;

  const indiaLat = countries["india"].latitude;
  const indiaLng = countries["india"].longitude;
  const distance = 0; // in km
  if (origin === "india") {
    if (manufacturer === null) { // country of origin is india, but we dont have manufacturer pincode
      const endLat = codes[dest].lat;
      const endLng = codes[dest].lng;
      distance = latLngDistance(indiaLat, indiaLng, endLat, endLng);
      carbonShipping = distance * 550; // gramms of carbon emission per kilometer
    } else { // we have manufacturer pincode in India
      const startLat = codes[manufacturer].lat;
      const startLng = codes[manufacturer].lng;
      const endLat = codes[dest].lat;
      const endLng = codes[dest].lng;
      distance = latLngDistance(startLat, startLng, endLat, endLng);
    }
  } else {
    const originLat = countries[origin].latitude;
    const originLng = countries[origin].longitude;
    const water_dist = latLngDistance(originLat, originLng, indiaLat, indiaLng) * waterDistanceConst;
    carbonShipping = water_dist * 21 * weight * 1e-6;
  }
  return carbonShipping;
}

function toRad(x) {
  return x * 0.0174532925199433;
}

function latLngDistance(startLat, startLng, endLat, endLng) {
  const KM_RATIO = 6371;

  const deltaLat = toRad(endLat - startLat);
  const deltaLng = toRad(endLng - startLng);
  const lat1Rad = toRad(startLat);
  const lat2Rad = toRad(endLat);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return c * KM_RATIO;
}

const materialAirPollution = { // contains carbon emission (g) per gram of mamterial
  "wood": 1,
  "plastic": 5,
  "cotton": 1,
  "silk": 1,
  "denim": 1,
  "leather": 1,
  "polyester": 1,
  "wool": 1
}

const materialWaterPollution = { // contains carbon emission (g) per gram of mamterial
  "wood": 1,
  "plastic": 5,
  "cotton": 1,
  "silk": 1,
  "denim": 1,
  "leather": 1,
  "polyester": 1,
  "wool": 1
}

function calculateAirPollution(category, weight, origin, materials) {

    var air = 0; // air pollution in g of GHG and water pollution in l of water contaminated
    if (category === "electronics") {
        if (origin === "China") {
            // Almost same as below with variations according to China's pollution standards (backed by the internet)
            air += weight * 3.4575;

        } else {
            // ((0.25*3.9) + (0.205*2) + (0.07*0.2) + (0.15*5) + (0.07*3.5))
            // Silicon + Iron&Steel + Copper + Aluminium + Lead
            air += weight * 2.394;
        }
    } else if (category === "clothing" || category === "furniture") {
      for (var i=0; i<materials.length; i++) {
        air += materialAirPollution[materials[i]] * weight / materials.length;
      }
    } else if (category === "books") {
      air += weight * 0.212;
    } else {
        return "Unavailable";
    }
    return air;
}

function calculateWaterPollution(category, weight, origin, materials) {
    var water = 0; // water pollution in l of water contaminated
    // Can change water during manufacture if find better src
    if (category === "electronics") {
        if (origin === "China") {
            // Almost same as below with variations according to China's pollution standards (backed by the internet)
            water = 480 + (weight*0.45);

        } else {
            // ((0.25*0.24) + (0.205*0.984) + (0.07*0.22) + (0.07*0.5) + (0.15*0.12))
            // Silicon + Iron&Steel + Copper + Lead + Aluminium
            water = 480 + (weight*0.33);
        }

    } else if (category === "clothing" || category === "furniture") {
      for (var i=0; i<materials.length; i++) {
        water += materialWaterPollution[materials[i]] * weight / materials.length;
      }
    } else if (category === "books") {
        water += weight * 0.009;

    } else {
        water = "Unavailable"
    }
    return water
}

function calculateTreeFigure(category, weight, materials) {
    var annualLoss;

    if (category === "books") {
        annualLoss = weight * 0.03008;

    } else if (category === "furniture" && materials.includes("wood")) {

        // 500 kg / m^3 density of leaf - 0.00025m avg thickness of leaf - 50kg wood per kg leaves
        // An avg softwood of 5232 pounds absorbs 8-9 tonnes of CO2 in a yr
        annualLoss = weight * 30.08/materials.length;

    } else {
      return 0;
    }
    return annualLoss
}

var airPollution = calculateAirPollution(category, weight, origin, matsUsed)
  + calculateShippingPollution(weight, origin, address, manufacturer);
var waterPollution = calculateWaterPollution(category, weight, origin, matsUsed);
var treeFigure = calculateTreeFigure(category, weight, matsUsed);

chrome.runtime.sendMessage({
  "air": airPollution,
  "water": waterPollution,
  "treeFigure": treeFigure
})
