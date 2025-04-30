import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderCreature(id) {
    const creature = await getResource('creatures', id)
    document.title = `Creature - ${ creature.name }`
    const name = document.createElement('h1')
    name.textContent = creature.name
    const img = document.createElement('img')
    img.src = creature.image
    img.alt = creature.name
    img.id = 'details-img'
    const description = document.createElement('p')
    description.textContent = creature.description || ''
    const header = document.createElement('header')
    header.appendChild(name)
    header.appendChild(description)
    header.appendChild(img)

    document.body.appendChild(header)
}

renderCreature(id)
