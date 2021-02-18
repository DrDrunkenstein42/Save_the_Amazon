import codes from "./pincodes";
import countries from "./countries"

const waterDistanceConst = 1;

function calculateShippingPollution(weight, origin, dest, manufacturer=null) {
  const carbonShipping = 0;
  const waterShipping = 0;

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
  return [carbonShipping, waterShipping];
}

function calculatePollution(weight, origin, dest, manufacturer=null) {

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var pollution = calculatePollution(request["category"] ,request["weight"], request["manufacturer"]);
    window.airPollution = pollution[0];
    window.waterPollution = pollution[1];
    window.shipping = calculateShipping(request["manufacturer"], request["address"]);
})
