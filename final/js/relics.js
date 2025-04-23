import { getResources } from "./services.js";

async function renderRelics() {
  const relics = await getResources("relics");

  relics.forEach((relics) => {
    const name = document.createElement("h2");
    const img = document.createElement("img");
    name.textContent = relics.name;
    img.src = relics.image;
    document.body.appendChild(name);
    document.body.appendChild(img);
  });
}

renderRelics();
