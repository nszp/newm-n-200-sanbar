import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderRelic(id) {
    const relic = await getResource('relics', id)
    const name = document.createElement('h1')
    const img = document.createElement('img')
    const description = document.createElement('p')
    const container = document.createElement('div')
    document.title = `Relic - ${ relic.name }`
    name.textContent = relic.name
    img.src = relic.image
    img.id = 'details-img'
    description.textContent = relic.description
    document.body.appendChild(name)
    container.appendChild(img)
    container.appendChild(description)
    document.body.appendChild(container)
}

renderRelic(id)
