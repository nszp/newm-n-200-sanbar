import { getResources } from './services.js'
import { redirect } from './utilities.js';

const container = document.querySelector('main')

async function renderCreatures() {
    const creatures = await getResources('creatures')

  creatures.forEach((creature) => {
    const newUrl = `./creature.html?id=${creature.id}`
    if (creature.name === 'Chimera') return
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener('click', () => redirect(newUrl))
    const name = document.createElement("h2");
    name.textContent = creature.name;
    const img = document.createElement("img");
    img.src = creature.image;
    const link = document.createElement("a");
    link.href = newUrl;
    link.classList.add("card-link");
    link.textContent = "Learn More";
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(link);
    container.appendChild(card);
  });
}

renderCreatures()
