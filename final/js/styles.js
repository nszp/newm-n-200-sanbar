// import 'https://cdn.skypack.dev/twind/shim'

// Background

const fixedBackground = document.createElement('div')
fixedBackground.id = 'fixed-background'

const isolationLayer = document.createElement('div')
isolationLayer.id = 'isolation-layer'

const noiseLayer = document.createElement('div')
noiseLayer.id = 'noise-layer'

const colorLayer = document.createElement('div')
colorLayer.id = 'color-layer'

isolationLayer.append(noiseLayer, colorLayer)
fixedBackground.append(isolationLayer)
document.body.append(fixedBackground)

// Navbar

const navbar = document.createElement('nav')
const pages = [
    ['home', 'index'],
    ['olympians', 'olympian'],
    ['heroes', 'hero'],
    // ['stories', 'story'],
    ['relics', 'relic'],
    ['creatures', 'creature'],
    ['account', 'account']
]

let current = location.pathname.split('/').pop().split('.')[0]
for (const [name, link] of pages) {
    const isCurrent = current === name || current === link || (name === 'home' && current === '')
    // console.log(`isCurrent: ${ isCurrent } for ${ name } (${ current })`)

    const a = document.createElement('a')
    a.href = name === 'home' ? './' : `./${ name }.html`
    a.textContent = name.charAt(0).toUpperCase() + name.slice(1)
    a.className = isCurrent ? 'current' : ''
    navbar.appendChild(a)
}

document.body.prepend(navbar)