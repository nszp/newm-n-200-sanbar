import { getResources } from "./services.js";

async function renderOlympians() {
  const olympians = await getResources("olympians")

  olympians.forEach(olympian => {
    const name = document.createElement('h2')
    const img = document.createElement('img')
    name.textContent = olympian.greekName
    img.src = olympian.image
    document.body.appendChild(name)
    document.body.appendChild(img)
  });
}

renderOlympians()