
export const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1)
}

export const formatPrice = (priceNumber: number) => {
    return `$${priceNumber.toFixed(2)}`
}