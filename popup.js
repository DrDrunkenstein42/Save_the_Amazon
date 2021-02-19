document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "hi", updatePopup)
  })
}, false);

function updatePopup (res) {
  document.getElementById("air-value").innerHTML = res["air"].toString() + " g";
  document.getElementById("water-value").innerHTML = res["water"].toString() + " l";

  var treeFigure = res["treeFigure"];


  if (!(treeFigure === 0 || treeFigure === undefined)) {

    var treeDiv = document.createElement("div");
    var className = document.createAttribute("class");
    var id = document.createAttribute("id");
    id.value = "tree";
    className.value = "container";
    treeDiv.setAttributeNode(className);
    treeDiv.setAttributeNode(id);
    treeDiv.textContent = "CO2 absorbed annually by trees cut";
    document.getElementsByClassName("mainContainer")[0].append(treeDiv);


    var treeValue = document.createElement("div");
    var newClass = document.createAttribute("class");
    newClass.value = "values";
    var newId = document.createAttribute("id");
    newId.value = "treeValue";
    treeValue.setAttributeNode(newClass);
    treeValue.setAttributeNode(newId)
    treeValue.textContent = treeFigure;


  } else {
    if (!(document.getElementById("treeValue") === null)) {

      document.getElementById("treeValue").remove();
      document.getElementById("tree").remove();
    }

  }

}
