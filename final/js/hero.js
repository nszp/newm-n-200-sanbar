import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderHero(id) {
    const hero = await getResource('heroes', id)

    document.title = `Hero - ${ hero.name }`
    const name = document.createElement('h1')
    const img = document.createElement('img')
    const description = document.createElement('p')
    const header = document.createElement('header')
    name.textContent = hero.name
    img.src = hero.image
    img.alt = hero.name
    img.id = 'details-img'
    description.textContent = hero.description || hero.bio || ''

    header.appendChild(name)
    header.appendChild(description)
    header.appendChild(img)

    document.body.appendChild(header)
}

renderHero(id)
