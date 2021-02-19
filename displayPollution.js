chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var air = request["air"];
  var water = request["water"];
  var treeFigure = request["treeFigure"];

  window.airPollution = air;
  window.waterPollution = water;
  window.treeFigure = treeFigure; // Need to make corresponding change to display this in popup.js
})
