export interface IFavorites {
  _id: string;
  counter: number;
  userId: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  productId: ProductId;
  _id: string;
  addedAt: string;
}

export interface ProductId {
  _id: string;
  name: string;
  shortdescription: string;
  longdescription: string;
  price: number;
  category: string;
  subCategory: string;
  stock: number;
  imageCover: string;
  images: string[];
  ratingAvg: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
