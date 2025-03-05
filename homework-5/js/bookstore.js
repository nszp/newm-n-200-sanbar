const booksUlRef = document.querySelector("#books");
const cartUlRef = document.querySelector("#cart");
const noBooksRef = document.querySelector("#no-books");
const removeBookRef = document.querySelector("#remove-book");

const books = [
  "Hop on Pop",
  "Fox in Socks",
  "The Cat in the Hat",
  "A Fly Went By",
];
const cart = [];

function noBookPText() {
  if (cart.length > 0) {
    noBooksRef.style.display = "none";
  } else {
    noBooksRef.style.display = "block";
  }
}

function removeItemFromCart() {
  cart.pop();
  showBookCart();
  noBookPText();
}

function showBookCart() {
  cartUlRef.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    cartUlRef.innerHTML += "<li>" + cart[i] + "</li>";
  }
}

function addItemToCart(e) {
  cart.push(e.target.dataset.name);
  showBookCart();
  noBookPText();
}

for (let i = 0; i < books.length; i++) {
  const newLi = document.createElement("li");
  newLi.innerText = books[i];

  const newBtn = document.createElement("button");
  newBtn.innerText = "+";
  newBtn.dataset.name = books[i];
  newBtn.onclick = addItemToCart;
  newLi.appendChild(newBtn);

  booksUlRef.appendChild(newLi);
  console.log(books[i]);
  removeBookRef.onclick = removeItemFromCart;
}

// booksUlRef.onclick = noBookPText;
