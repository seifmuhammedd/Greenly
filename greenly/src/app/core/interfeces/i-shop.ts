export interface IShop {
    categoryId: string
    categoryName: string
    subCategories: SubCategory[]
  }
  
  export interface SubCategory {
    subCategoryId: string
    subCategoryName: string
    products: any[]
  }