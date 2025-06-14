export interface ILoans {
  _id: string
  userId: UserId
  inputData: InputData
  loanStatus: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UserId {
  _id: string
  userName: string
  email: string
}

export interface InputData {
  Gender: string
  Married: string
  Dependents: string
  Education: string
  Self_Employed: string
  ApplicantIncome: number
  CoApplicantIncome: number
  LoanAmount: number
  Loan_Amount_Term: number
  Credit_History: string
  Property_Area: string
}

