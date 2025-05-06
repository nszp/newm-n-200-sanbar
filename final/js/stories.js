import { getResources } from './services.js'
import { redirect } from './utilities.js'

let currentEditId = null

function renderCard(story, isLocalStorage = false) {
    const card = document.createElement('div')
    card.className = 'card'
    card.id = `card-${ story.id }`
    if (!isLocalStorage) card.addEventListener('click', () => redirect(`./story.html?id=${ story.id }`))

    const name = document.createElement('h2')
    name.textContent = story.name
    card.appendChild(name)

    const img = document.createElement('img')
    img.src = story.image
    card.appendChild(img)

    if (!isLocalStorage) {
        const a = document.createElement('a')
        a.textContent = 'Learn More'
        card.appendChild(a)
    } else {
        const buttons = document.createElement('div')
        buttons.className = 'buttons'

        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', (event) => {
            event.stopPropagation()
            currentEditId = story.id
            const form = document.getElementById('addStoryForm')
            form.name.value = story.name
            form.image.value = story.image
            form.querySelector('button[type="submit"]').textContent = 'Update'
        })
        buttons.appendChild(editButton)

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const localStorageData = JSON.parse(localStorage.getItem('stories')) || []
            const updatedData = localStorageData.filter(item => item.id !== story.id)
            localStorage.setItem('stories', JSON.stringify(updatedData))
            if (story.id === currentEditId) {
                currentEditId = null
                form.querySelector('button[type="submit"]').textContent = 'Add'
                form.reset()
            }
            card.remove()
        })
        buttons.appendChild(deleteButton)

        card.appendChild(buttons)
    }

    return card
}

async function renderStories() {

    const apiStories = await getResources('stories')
    const localStorageStories = JSON.parse(localStorage.getItem('stories')) || []

    for (const story of apiStories) {
        document.querySelector('main').appendChild(renderCard(story))
    }

    for (const story of localStorageStories) {
        document.querySelector('main').appendChild(renderCard(story, true))
    }
}

renderStories()

const form = document.getElementById('addStoryForm')

// TODO: HIDE FORM IF USER IS NOT LOGGED IN AND SHOW WHEN LOGGED IN

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Add to localstorage
    const formData = new FormData(form)
    const localStorageData = JSON.parse(localStorage.getItem('stories')) || []

    if (currentEditId) {
        const storyIndex = localStorageData.findIndex(story => story.id === currentEditId)
        if (storyIndex !== -1) {
            localStorageData[storyIndex].name = formData.get('name')
            localStorageData[storyIndex].image = formData.get('image')
            localStorage.setItem('stories', JSON.stringify(localStorageData))
            const card = document.getElementById(`card-${ currentEditId }`)
            card.querySelector('h2').textContent = formData.get('name')
            card.querySelector('img').src = formData.get('image')
            card.querySelector('img').alt = formData.get('name')
        }
        currentEditId = null
        form.querySelector('button[type="submit"]').textContent = 'Add'
        form.reset()
        return
    }

    const newStory = {
        id: localStorageData.length + 1,
        name: formData.get('name'),
        image: formData.get('image')
    }

    localStorageData.push(newStory)
    localStorage.setItem('stories', JSON.stringify(localStorageData))

    // Add to the page
    const card = renderCard(newStory, true)

    document.querySelector('main').appendChild(card)
    form.reset()
})