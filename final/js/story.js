import { getResource } from './services.js'

async function renderStory() {
    const story = await getResource('stories', new URLSearchParams(window.location.search).get('id'))
    document.title = `Story - ${ story.name }`

    const header = document.createElement('header')

    const name = document.createElement('h1')
    name.textContent = story.name
    header.appendChild(name)

    const description = document.createElement('p')
    description.textContent = story.description
    header.appendChild(description)

    const img = document.createElement('img')
    img.src = story.image
    header.appendChild(img)

    document.body.appendChild(header)
}

renderStory()