export const getClientLocationDetails = async (ip: string) => {
    const response = await fetch(`https://ipapi.co/${ip}/json/`)

    const data = await response.json()

    if(data.error) {
        console.error(data.reason)

       return {
        success: false,
        error: "Failed to fetch location details"
       }
    }

    return {
        success: true,
        data
    }
}