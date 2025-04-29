export interface ICart {
    _id: string
    userId: string
    products: Product[]
    totalPrice: number
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Product {
    productId: ProductId
    quantity: number
    price: number
    _id: string
  }
  
  export interface ProductId {
    _id: string
    name: string
    shortdescription: string
    longdescription: string
    price: number
    category: string
    subCategory: string
    stock: number
    imageCover: string
    images: string[]
    ratingAvg: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
