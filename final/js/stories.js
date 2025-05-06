import { getResources } from './services.js'
import { redirect } from './utilities.js'

async function renderStories() {
    for (const story of await getResources('stories')) {
        const card = document.createElement('div')
        card.className = 'card'
        card.addEventListener('click', () => redirect(`./story.html?id=${ story.id }`))

        const name = document.createElement('h2')
        name.textContent = story.name
        card.appendChild(name)

        const img = document.createElement('img')
        img.src = story.image
        card.appendChild(img)

        const a = document.createElement('a')
        a.textContent = 'Learn More'
        card.appendChild(a)

        document.querySelector('main').appendChild(card)
    }
}

renderStories()