export interface IProduct {
    _id: string
    name: string
    shortdescription: string
    longdescription: string
    price: number
    category: Category
    subCategory: string
    stock: number
    imageCover: string
    images: string[]
    ratingAvg: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Category {
    _id: string
    name: string
  }
  