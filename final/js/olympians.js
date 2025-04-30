import { getResources } from './services.js';

const containerRef = document.querySelector('#container')

async function renderOlympians() {
  const olympians = await getResources('olympians')

  olympians.forEach(olympian => {
    const name = document.createElement('h2')
    const img = document.createElement('img')
    const card = document.createElement('div')
    const link = document.createElement('a')
    name.textContent = olympian.greekName
    img.src = olympian.image
    card.className = 'card'
    link.href = `./olympian.html?id=${olympian.id}`
    link.className = 'card-link'
    link.textContent = 'Learn More'
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(link)
    containerRef.appendChild(card)
  });
}

renderOlympians()