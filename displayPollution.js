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

var calculateAirPollution = function (category, weight, origin, materials) {

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

var calculateWaterPollution = function (category, weight, origin, materials) {
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

var calculateTreeFigure = function (category, weight, materials) {
    var annualLoss;

    if (category === "books") {
        annualLoss = weight * 0.03008;

    } else if (category === "furniture" && materials.includes("wood")) {

        // 500 kg / m^3 density of leaf - 0.00025m avg thickness of leaf - 50kg wood per kg leaves
        // An avg softwood of 5232 pounds absorbs 8-9 tonnes of CO2 in a yr
        annualLoss = weight * 30.08/materials.length;

    } else {
      return null;
    }
    return annualLoss
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var category = request["category"];
  var weight = request["weight"];
  var origin = request["origin"];
  var materials = request["materials"].split(" "); // might not work - still have to test
  materials = materials.slice(0, materials.length-1);
  window.airPollution = calculateAirPollution(category, weight, origin, materials) + calculateShippingPollution(weight, origin, request["address"], manufacturer);
  window.waterPollution = calculateWaterPollution(category, weight, origin, materials);
  if ((category === "furniture" && material === "wood") || category === "books") {
    window.treeFigure = calculateTreeFigure(category, weight, materials); // Need to make corresponding change to display this in popup.js
  }
})
