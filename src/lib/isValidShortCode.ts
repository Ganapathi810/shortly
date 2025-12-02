export const isValidShortCode = (shortCode: string) => {
    const regex = /^[0-9A-Za-z]{6,8}$/;

    return regex.test(shortCode)
}