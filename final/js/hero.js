import { getResource } from './services.js';

const id = new URLSearchParams(window.location.search).get('id')
const containerRef = document.querySelector('#hero-details');


async function renderHero(id) {
    const hero = await getResource('heroes', id);
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const description = document.createElement('p');
    const link = document.createElement('a');
    title.textContent = hero.name;
    img.src = hero.image;
    img.alt = hero.name;
    description.textContent = hero.description || hero.bio || '';
    containerRef.appendChild(title);
    containerRef.appendChild(img);
    containerRef.appendChild(description);
}

renderHero(id);
