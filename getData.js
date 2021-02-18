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
      return parseInt(address.substring(i, i+6));
    }
  }

  return null;
}

// get product weight and pincode
var weight = 0;
var pincode = 0;

if (category === "books" || category === "clothing") {
  var details = document.getElementsByClassName("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list")[0];
  for (var i=0; i<details.children.length; i++) {
    if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("weight")) {
      weight = details.children[i].children[0].children[1].innerHTML;
    } else if (details.children[i].children[0].children[0].innerHTML.toLowerCase().includes("manufacturer")) {
      pincode = details.children[i].children[0].children[1].innerHTML;
      pincode = extractPincode(pincode);
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
  "pincode": pincode,
  "address": address
})
