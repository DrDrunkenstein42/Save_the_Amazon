document.addEventListener("DOMContentLoaded", function () {
    var bg = chrome.extension.getBackgroundPage()

    document.getElementById("Air").textContent = bg.airPollution;
    document.getElementById("Water").textContent = bg.waterPollution;

    if (!(window.treeFigure === null)) {
        // have to create div element and set its textContent to the treeFigure
    }

})
