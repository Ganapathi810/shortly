const frontendUrl = process.env.FRONTEND_URL

export const getSystemDetails = async () => {
    const response = await fetch(`/healthz`)

    if(!response.ok) {
        const errorResponse = await response.json()

        return errorResponse;
    }

    const data = await response.json()

    return data
}

export const getAllShortLinks = async () => {
    const response = await fetch(`${frontendUrl}/api/links`,{
        next: {
            tags: ["shortlinks"]
        }
    })

    if(!response.ok) {
        const errorResponse = await response.json()

        return errorResponse;
    }

    const data = await response.json()

    return data
}

export const getShortLinkByCode = async (code: string) => {
    const response = await fetch(`${frontendUrl}/api/links/${code}`)

    if(!response.ok) {
        const errorResponse = await response.json()

        return errorResponse;
    }

    const data = await response.json()

    return data
}