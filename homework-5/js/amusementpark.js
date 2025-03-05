const ticketsRef = document.querySelector('#tickets');
const removeticketBtn = document.querySelector('#remove-ticket');
const cartRef = document.querySelector('#cart');
const noticketRef = document.querySelector('#no-ticket');


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
