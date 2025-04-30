import { getResources } from "./services.js";

const containerRef = document.querySelector("#container");

async function renderRelics() {
  const relics = await getResources("relics");

  relics.forEach((relics) => {
    const name = document.createElement("h2");
    const img = document.createElement("img");
    const card = document.createElement("div");
    const link = document.createElement("a");
    name.textContent = relics.name;
    img.src = relics.image;
    card.className = "card";
    link.href = `./relic.html?id=${relics.id}`;
    link.className = "card-link";
    link.textContent = "Learn More";
    img.className = "relics-img";
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(link);
    // document.body.appendChild(name);
    // document.body.appendChild(img);
    containerRef.appendChild(card);
  });
}

renderRelics();
