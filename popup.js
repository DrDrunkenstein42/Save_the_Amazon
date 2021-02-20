document.addEventListener("DOMContentLoaded", function() {
  var bg = chrome.extension.getBackgroundPage();
  var airPollution = bg.airPollution;
  var waterPollution = bg.waterPollution;
  var treeFigure = bg.treeFigure;

  if (airPollution > 1000) {
    airPollution = (airPollution/1000).toFixed(1) + " kg";
  } else { airPollution = airPollution.toString() + " g"; }
  if (waterPollution > 1000) {
    waterPollution = (waterPollution/1000).toFixed(1) + " kl";
  } else { waterPollution = waterPollution.toString() + " l"; }
  if (treeFigure > 1000) {
    treeFigure = (treeFigure/1000).toFixed(1) + " kg";
  } else { treeFigure = treeFigure.toString() + " g"; }

  document.getElementById("air-value").innerHTML = airPollution;
  document.getElementById("water-value").innerHTML = waterPollution;
  document.getElementById("tree-value").innerHTML = treeFigure;
})
