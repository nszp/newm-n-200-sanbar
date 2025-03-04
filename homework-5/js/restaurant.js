// cached element references
const menuRef = document.querySelector('#menu')
const btnRef = document.querySelector('#remove-item')
const cartRef = document.querySelector('#cart')
const pRef = document.querySelector('#no-items')

const menuItems = [
  'Hamburger',
  'Cheeseburger',
  'Fries',
  'Onion Rings',
]

const cart = []

const showP = () => {
  if (!cart.length) {
    pRef.style.display = 'inline'
  } else {
    pRef.style.display = 'none'
  }
}

const addItemToCart = (evt) => {
  cart.push(evt.target.dataset.item)
  showCart()
}

const removeItemFromCart = () => {
  cart.pop()
  showCart()
}

const showCart = () => {
  cartRef.innerHTML = ''
  for (let i = 0; i < cart.length; i++) {
    cartRef.innerHTML += `<li>${cart[i]}</li>`
  }
  showP()
}

for (let i = 0; i < menuItems.length; i++) {
  const item = menuItems[i]
  const liEl = document.createElement('li')
  liEl.innerText = item
  const btnEl = document.createElement('button')
  btnEl.innerText = '+'
  btnEl.style.width = '24px'
  btnEl.style.height = '24px'
  btnEl.style.margin = '0 0 8px 8px'
  btnEl.dataset.item = item
  btnEl.onclick = addItemToCart
  liEl.appendChild(btnEl)
  menuRef.appendChild(liEl)
}

btnRef.addEventListener('click', removeItemFromCart)