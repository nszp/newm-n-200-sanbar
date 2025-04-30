import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderOlympian(id) {
    const olympian = await getResource('olympians', id)

    document.title = `Olympian - ${ olympian.greekName }`
    const name = document.createElement('h1')
    const img = document.createElement('img')
    const gName = document.createElement('h2')
    const rName = document.createElement('h2')
    const description = document.createElement('p')
    const container = document.createElement('div')
    name.textContent = olympian.greekName
    img.src = olympian.image
    img.id = 'details-img'
    description.textContent = olympian.description
    gName.textContent = `Greek Name: ${ olympian.greekName }`
    rName.textContent = `Roman Name: ${ olympian.romanName }`
    document.body.appendChild(name)
    container.appendChild(img)
    container.appendChild(gName)
    container.appendChild(rName)
    container.appendChild(description)
    document.body.appendChild(container)
}

renderOlympian(id)