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

// get product weight and country of origin
var weight = 0;
var origin = "";
if (category === "books") {
  var details = document.getElementsByClass("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list");
  for (var i=0; i<details.children.length; i++) {
    if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.children[i].children[0].children[1].innerHTML;
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.children[i].children[0].children[1].innerHTML;
    }
  }
} else {
  var details = document.getElementById("productDetails_techSpec_section_1");
  for (var i=0; i<details.rows.length; i++) {
    if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.rows[i].cells[1].innerHTML;
    } else if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.rows[i].cells[1].innerHTML;
    }
  }
}

//get weight as integer in grams
if (weight.includes("Kilograms")) {
  weight = parseInt(weight.substring(0, weight.length-10));
} else {
  weight = parseInt(weight.substring(0, weight.length-2));
}
