import { getResources } from "./services.js";

async function renderHeroes() {
  const heroes = await getResources("heoroes")

  heroes.forEach(hero => {
    const name = document.createElement('h2')
    const img = document.createElement('img')
    name.textContent = hero.name
    img.src = hero.image
    document.body.appendChild(name)
    document.body.appendChild(img)
  });
}

renderHeroes()