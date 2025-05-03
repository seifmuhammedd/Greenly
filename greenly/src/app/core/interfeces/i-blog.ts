export interface IBlog {
  _id: string
  content: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CreatedBy {
  _id: string
  userName: string
}

