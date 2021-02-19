document.addEventListener("DOMContentLoaded", function() {
  var bg = chrome.extension.getBackgroundPage();

  document.getElementById("air-value").innerHTML = bg.airPollution.toString() + " kg";
  document.getElementById("water-value").innerHTML = bg.waterPollution.toString() + " l";
  /*
  console.log("Water Pollution:")
  console.log(bg.waterPollution);
  console.log("Air Pollution:")
  console.log(bg.airPollution);
  */


  if (!(window.treeFigure === 0 || window.treeFigure === undefined)) {

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
    treeValue.textContent = window.treeFigure;

    document.getElementById("tree").append(treeValue);
    /*
    console.log();
    console.log("Tree Figure");
    console.log(window.treeFigure);
    */
  } else {
    if (!(document.getElementById("treeValue") === null)) {
      /*
      console.log();
      console.log("TreeValue");
      console.log(document.getElementById("treeValue"));
      */
      document.getElementById("treeValue").remove();
      document.getElementById("tree").remove();
    }

  }

})
