import { getResources } from './services.js'
import { redirect } from './utilities.js'

const containerRef = document.querySelector('main')

async function renderHeroes() {
    const heroes = await getResources('heroes')

    heroes.forEach(hero => {
        const newUrl = `./hero.html?id=${hero.id}`
        const name = document.createElement('h2')
        const img = document.createElement('img')
        const card = document.createElement('div')
        const link = document.createElement('a')
        name.textContent = hero.name
        img.src = hero.image
        img.alt = hero.name
        card.className = 'card'
        card.addEventListener('click', () => redirect(newUrl))
        link.href = newUrl
        link.className = 'card-link'
        link.textContent = 'Learn More'
        card.appendChild(name)
        card.appendChild(img)
        card.appendChild(link)
        containerRef.append(card)
    })
}

renderHeroes()