import { getResources } from './services.js';

const containerRef = document.querySelector('#container')

async function renderOlympians() {
  const olympians = await getResources('olympians')

  olympians.forEach(olympian => {
    const name = document.createElement('h2')
    const img = document.createElement('img')
    const div = document.createElement('div')
    const link = document.createElement('a')
    name.textContent = olympian.greekName
    img.src = olympian.image
    div.className = 'card'
    link.href = `/olympian.html?id=${olympian.id}`
    link.className = 'card-link'
    link.textContent = 'Learn More'
    div.appendChild(name)
    div.appendChild(img)
    div.appendChild(link)
    containerRef.append(div)
  });
}

renderOlympians()