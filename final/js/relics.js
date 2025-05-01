import { getResources } from './services.js'
import { redirect } from './utilities.js'

const containerRef = document.querySelector('main')

async function renderRelics() {
    const relics = await getResources('relics')

    relics.forEach((relics) => {
        const newUrl = `./relic.html?id=${relics.id}`
        const name = document.createElement('h2')
        const img = document.createElement('img')
        const card = document.createElement('div')
        const link = document.createElement('a')
        name.textContent = relics.name
        img.src = relics.image
        card.className = 'card'
        card.addEventListener('click', () => redirect(newUrl))
        link.href = newUrl
        link.className = 'card-link'
        link.textContent = 'Learn More'
        img.className = 'relics-img'
        card.appendChild(name)
        card.appendChild(img)
        card.appendChild(link)
        containerRef.appendChild(card)
    })
}

renderRelics()
