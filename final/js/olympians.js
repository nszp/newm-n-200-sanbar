import { getResources } from "./services.js";

const containerRef = document.querySelector('#container')

async function renderOlympians() {
  const olympians = await getResources("olympians")

  olympians.forEach(olympian => {
    const name = document.createElement('h2')
    const img = document.createElement('img')
    const div = document.createElement('div')
    name.textContent = olympian.greekName
    img.src = olympian.image
    div.id = 'card'
    div.appendChild(name)
    div.appendChild(img)
    containerRef.append(div)
  });
}

renderOlympians()