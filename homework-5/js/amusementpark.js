const ticketsRef = document.querySelector('#tickets');
const cartRef = document.querySelector('#cart');
const noticketRef = document.querySelector('#no-ticket');
const removeticketBtn = document.querySelector('#remove-ticket');

const ticketTypes = [
    'Senior', 
    'Adult', 
    'Child', 
    'Student'
];

const cart = [];

const shownoticketmessage = () => {
  if (cart.length > 0) {
    noticketRef.style.display = 'none';
  } else {
    noticketRef.style.display = 'inline';
  }
};

const showcart = () => {
  cartRef.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    const li = document.createElement('li');
    li.textContent = cart[i];
    cartRef.appendChild(li);
  }
  shownoticketmessage();
};

function addtickettoCart (event) {
    const ticket = event.target.getAttribute('data-item');
    cart.push(ticket);
  showcart();
};

function removeticketfromcart() {
  cart.pop();
  showcart();
};

for (let i = 0; i < ticketTypes.length; i++) {
  const ticket = ticketTypes[i];
  const li = document.createElement('li');
  li.innerText = ticket;

  const btn = document.createElement('button');
  btn.setAttribute('data-item', ticket);
  btn.innerText = '+';
  btn.style.width = '22px';
  btn.style.height = '22px';
  btn.style.margin = '0 0 8px 8px';
  btn.dataset.item = ticket;

  btn.onclick = addtickettoCart;
  li.appendChild(btn);
  ticketsRef.appendChild(li);
}

removeticketBtn.addEventListener('click', removeticketfromcart);

showcart();