
export type CartItem = {
    image: string | undefined
    slug: string
    quantity: number
    counInStock: number
    price: number
    _id: string
    name: string
}

export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    country: string
    postalCode: string
}

export type Cart = {
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalItems: CartItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
}