document.addEventListener("DOMContentLoaded", function () {
    var bg = chrome.extension.getBackgroundPage()

    document.getElementById("Air").textContent = bg.airPollution;
    document.getElementById("Water").textContent = bg.waterPollution;

})
