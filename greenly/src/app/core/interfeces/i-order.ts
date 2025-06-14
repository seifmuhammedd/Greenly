export interface IOrder {
  _id: string
  userId: UserId
  items: Item[]
  amount: number
  status: string
  statusofpayment: string
  checkoutSessionId: string
  shippingAddress: ShippingAddress
  phone: string
  createdAt: string
  __v: number
}

export interface UserId {
  _id: string
  userName: string
  email: string
}

export interface Item {
  productId: ProductId
  quantity: number
  price: number
  _id: string
}

export interface ProductId {
  _id: string
  name: string
}

export interface ShippingAddress {
  city: string
  state: string
  street: string
  building: string
  floor: string
  apartment: string
  postalcode: string
  phone: string
  TYPE: string
  isDefault: boolean
  _id: string
}
