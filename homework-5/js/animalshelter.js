const petTypesRef = document.querySelector("#pets");
const cartRef = document.querySelector("#cart");
const noPetsParagraph = document.querySelector("#no-pets");
const removeBtnRef = document.querySelector("#remove-pet");

let petTypes = ["Dog", "Cat", "Rabbit", "Fox"];
let cart = [];

removeBtnRef.style.padding = "4px";

function showCart() {
  cartRef.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    cartRef.innerHTML += "<li>" + cart[i] + "</li>";
  }
}

function isCartEmpty() {
  if (cart.length == 0) {
    noPetsParagraph.style.display = "inline";
  } else {
    noPetsParagraph.style.display = "none";
  }
}

function removeItemFromCart() {
  cart.pop();
  showCart();
  isCartEmpty();
}

function addItemToCart(e) {
  cart.push(e.target.dataset.name);
  showCart();
  isCartEmpty();
}

removeBtnRef.onclick = removeItemFromCart;

isCartEmpty();
for (let i = 0; i < petTypes.length; i++) {
  const newLi = document.createElement("li");
  newLi.innerHTML = "&#8226; " + petTypes[i];
  newLi.innerHTML = petTypes[i];
  const newBtn = document.createElement("button");
  newBtn.innerText = "+";
  newBtn.style.margin = "10px";
  newBtn.style.padding = "2px";
  newBtn.dataset.name = petTypes[i];
  newBtn.onclick = addItemToCart;
  newLi.appendChild(newBtn);
  petTypesRef.appendChild(newLi);
}
