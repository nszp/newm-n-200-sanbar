const baseUrl = 'https://greek.nea.dev'

export async function getResources(resourceType) {
    try {
        const res = await fetch(`${ baseUrl }/${ resourceType }`)
        if (!res.ok) {
            throw new Error(`Response Status: ${ res.status }`)
        }
        return await res.json()

    } catch (error) {
        console.error(error.message)
    }
}

export async function getResource(resourceType, name) {
    try {
        const res = await fetch(`${ baseUrl }/${ resourceType }/${ name }`)
        if (!res.ok) {
            throw new Error(`Response Status: ${ res.status }`)
        }
        return await res.json()
    } catch (error) {
        console.error(error.message)
    }
}