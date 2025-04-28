export interface IShop {
  categoryId: string;
  categoryName: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  subCategoryId: string;
  subCategoryName: string;
  products: Product[];
}

export interface Product {
  _id: string;
  name: string;
  shortdescription: string;
  longdescription: string;
  price: number;
  category: Category;
  subCategory: SubCategory2;
  stock: number;
  imageCover: string;
  images: string[];
  ratingAvg: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory2 {
  _id: string;
  name: string;
}
