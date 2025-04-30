import { getResource } from './services.js'

const id = new URLSearchParams(window.location.search).get('id')

async function renderOlympian(id) {
    const olympian = await getResource('olympians', id)

    document.title = `Olympian - ${ olympian.greekName }`
    const name = document.createElement('h1')
    const img = document.createElement('img')
    // const gName = document.createElement('h2')
    const rName = document.createElement('h2')
    const description = document.createElement('p')
    const header = document.createElement('header')

    name.textContent = olympian.greekName
    img.src = olympian.image
    img.id = 'details-img'
    description.textContent = olympian.description
    // gName.textContent = `Greek Name: ${ olympian.greekName }`
    rName.textContent = `Roman Name: ${ olympian.romanName }`

    header.appendChild(name)
    // header.appendChild(gName)
    header.appendChild(rName)
    header.appendChild(description)
    header.appendChild(img)

    document.body.appendChild(header)


}

renderOlympian(id)