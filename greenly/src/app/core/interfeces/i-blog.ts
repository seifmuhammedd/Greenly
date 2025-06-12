export interface IBlog {
  _id: string
  content: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
  replies: Reply[]
}

export interface CreatedBy {
  _id: string
  userName: string
}

export interface Reply {
  content: string
  createdBy: CreatedBy
  _id: string
  createdAt: string
  updatedAt: string
}


