export interface ISubCategory {
  _id: string
  name: string
  description: string
  categoryid: Categoryid
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Categoryid {
  _id: string
  name: string
}
