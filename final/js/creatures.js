import { getResources } from "./services.js";

async function renderCreatures() {
  const creatures = await getResources("creatures");

  creatures.forEach((creature) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const name = document.createElement("h2");
    name.textContent = creature.name;
    const img = document.createElement("img");
    img.src = creature.image;
    const link = document.createElement("a");
    link.href = `creature.html?id=${creature.id}`;
    link.classList.add("card-link");
    link.textContent = "Learn More";
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(link);
    container.appendChild(card);
  });
}

renderCreatures();
