import { getResources } from './services.js'
import { redirect } from './utilities.js'

const containerRef = document.querySelector('main');
const form = document.getElementById('addHeroForm');
let currentEditId = null;

function renderCard(hero, isLocal = false) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${hero.id}`;

    if (!isLocal) {
    const newUrl = `./hero.html?id=${hero.id}`;
    card.addEventListener('click', () => redirect(newUrl));
  }
  const name = document.createElement('h2');
  name.textContent = hero.name;
  card.appendChild(name);

  const img = document.createElement('img');
  img.src = hero.image;
  img.alt = hero.name;
  card.appendChild(img);

  if (!isLocal) {
    const link = document.createElement('a');
    link.href = `./hero.html?id=${hero.id}`;
    link.className = 'card-link';
    link.textContent = 'Learn More';
    card.appendChild(link);
  } else {
    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', e => {
      e.stopPropagation();
      currentEditId = hero.id;
      form.name.value = hero.name;
      form.image.value = hero.image;
      form.querySelector('button[type="submit"]').textContent = 'Update Hero';
    });
    buttons.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', e => {
      e.stopPropagation();
      let localHeroes = JSON.parse(localStorage.getItem('heroes')) || [];
      localHeroes = localHeroes.filter(h => h.id !== hero.id);
      localStorage.setItem('heroes', JSON.stringify(localHeroes));

      if (currentEditId === hero.id) {
        currentEditId = null;
        form.querySelector('button[type="submit"]').textContent = 'Add Hero';
        form.reset();
      }

      card.remove();
    });
    buttons.appendChild(deleteButton);

    card.appendChild(buttons);
  }

  return card;
}

async function renderHeroes() {
  const apiHeroes = await getResources('heroes');
  const localHeroes = JSON.parse(localStorage.getItem('heroes')) || [];

  containerRef.innerHTML = '';
  apiHeroes.forEach(hero => containerRef.appendChild(renderCard(hero)));
  localHeroes.forEach(hero => containerRef.appendChild(renderCard(hero, true)));
}

renderHeroes();

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const image = formData.get('image').trim();

  let localHeroes = JSON.parse(localStorage.getItem('heroes')) || [];

  if (currentEditId) {
    const idx = localHeroes.findIndex(h => h.id === currentEditId);
    if (idx !== -1) {
      localHeroes[idx].name = name;
      localHeroes[idx].image = image;
      localStorage.setItem('heroes', JSON.stringify(localHeroes));
      const card = document.getElementById(`card-${currentEditId}`);
      card.querySelector('h2').textContent = name;
      card.querySelector('img').src = image;
      card.querySelector('img').alt = name;
    }

    currentEditId = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Hero';
    form.reset();
    return;
  }

  const newHero = {
    id: localHeroes.length + 1,
    name,
    image
  };

  localHeroes.push(newHero);
  localStorage.setItem('heroes', JSON.stringify(localHeroes));
  containerRef.appendChild(renderCard(newHero, true));

  form.reset();
});
