const flowers = [
    'Rose',
    'Tulip',
    'Daisy',
    'Lily',
]
const cart = [];

const flowersUl = document.getElementById('flowers');
const cartUl = document.getElementById('cart');
const noFlowersP = document.getElementById('no-flowers');

function updateNoFlowersP() {
    if (cart.length > 0) {
        noFlowersP.style.display = 'none';
    } else {
        noFlowersP.style.display = 'block';
    }
}

updateNoFlowersP();

function renderCart() {
    cartUl.innerHTML = '';
    for (const flower of cart) {
        const li = document.createElement('li');
        li.textContent = flower;
        cartUl.appendChild(li);
    }
}

function addToCart(event) {
    const flower = event.target.getAttribute('data-item');
    cart.push(flower);
    updateNoFlowersP();
    renderCart();
}

function removeFromCart() {
    cart.pop();
    renderCart();
    updateNoFlowersP();
}

document.getElementById('remove-flower').onclick = removeFromCart;

for (const flower of flowers) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = '+';
    btn.setAttribute('data-item', flower);
    btn.addEventListener('click', addToCart);
    li.appendChild(btn);
    const span = document.createElement('span');
    span.textContent = flower;
    li.appendChild(span);
    flowersUl.appendChild(li);
}