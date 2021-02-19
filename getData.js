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

if (category === "") {
  x = document.getElementById("nav-subnav");
  if (x.dataset.category === "apparel") {
    category = "clothing";
  }
}

function extractPincode(address) {
  if (address.length < 6) {
    return null;
  }
  for (var i=0; i<address.length-6; i++) {
    if (/^\d+$/.test(address.substring(i, i+6))) {
      return address.substring(i, i+6);
    }
  }
  return null;
}

// get product materials in case of furniture or clothing
const furnitureMats = ["wood", "plastic"];
const clothMats = ["cotton", "polyester", "leather", "silk", "wool", "denim"];

var matsUsed = "";
var info = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini")[0];
if (category === "clothing") {
  for (var i=0; i<clothMats.length; i++) {
    if (info.innerHTML.toLowerCase().includes(clothMats[i])) {
      matsUsed+= (clothMats[i] + " ");
    }
  }
} else if (category === "furniture") {
  for (var i=0; i<furnitureMats.length; i++) {
    if (info.innerHTML.toLowerCase().includes(furnitureMats[i])) {
      matsUsed+= (furnitureMats[i] + " ");
    }
  }
}
if (materials === "") {
  materials = null;
}

// get product weight, country of origin. get pincode of  manufacturer if in India
var weight = 0;
var origin = "";
var manufacturer = "";

if (category === "books" || category === "clothing") {
  var details = document.getElementsByClassName("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list")[0];
  for (var i=0; i<details.children.length; i++) {
    if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.children[i].children[0].children[1].innerHTML.toLowerCase();
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.children[i].children[0].children[1].innerHTML.toLowerCase();
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("manufacturer")) {
      manufacturer = extractPincode(details.children[i].children[0].children[1].innerHTML.toLowerCase());
    }
  }
} else {
  var details = document.getElementById("productDetails_techSpec_section_1");
  for (var i=0; i<details.rows.length; i++) {
    if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.rows[i].cells[1].innerHTML.toLowerCase();
    } else if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("origin")) {
      origin = details.rows[i].cells[1].innerHTML.toLowerCase();
    } else if (details.rows[i].cells[0].innerHTML.toLowerCase().includes("manufacturer")) {
      manufacturer = extractPincode(details.rows[i].cells[1].innerHTML.toLowerCase());
    }
  }
}

// get shipping pincode (you have to be signed in)
var address = document.getElementsByClassName("nav-line-2 nav-progressive-content")[0].innerHTML;
address = extractPincode(address);

//get weight as integer in grams
if (weight.includes("Kilograms")) {
  weight = parseInt(weight.substring(0, weight.length-10));
} else {
  weight = parseInt(weight.substring(0, weight.length-2));
}

chrome.runtime.sendMessage({
  "category": category,
  "weight": weight,
  "origin": origin,
  "manufacturer": manufacturer,
  "address": address,
  "materials": matsUsed
})
