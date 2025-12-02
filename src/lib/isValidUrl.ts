export const isValidUrl = (url: string) => {
    try {
        const { hostname, protocol } = new URL(url)

        if(!["http:", "https:"].includes(protocol)) return false

        if(!hostname.includes('.') || (hostname.split(".").pop()?.length ?? 0) < 2) {
            return false
        }
        
        return true;
    } catch {
        return false;
    }
}