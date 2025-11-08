export type Good = {
  id: number
  name: string
  price: number
  cover: string
}

export type CartItem = Good & {
  count: number
  selected: boolean
}
