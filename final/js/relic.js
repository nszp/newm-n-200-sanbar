import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderRelic(id) {
    const relic = await getResource('relics', id)
    const name = document.createElement('h1')
    const img = document.createElement('img')
    const description = document.createElement('p')
    const header = document.createElement('header')
    document.title = `Relic - ${ relic.name }`
    name.textContent = relic.name
    img.src = relic.image
    img.id = 'details-img'
    description.textContent = relic.description
    header.appendChild(name)
    header.appendChild(description)
    header.appendChild(img)
    document.body.appendChild(header)
}

renderRelic(id)
