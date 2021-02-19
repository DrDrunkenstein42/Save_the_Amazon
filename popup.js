document.addEventListener("DOMContentLoaded", function() {
  var bg = chrome.extension.getBackgroundPage();

  document.getElementById("air-value").innerHTML = bg.airPollution.toString() + " g";
  document.getElementById("water-value").innerHTML = bg.waterPollution.toString() + " l";
  document.getElementById("tree-value").innerHTML = bg.treeFigure.toString() + " g";
})
