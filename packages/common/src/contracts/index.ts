export interface JwtPayload {
  userId: string
}

export interface SigninInput {
  email: string
  password: string
}

export interface SignupInput {
  name: string
  email: string
  password: string
}

export interface FindById {
  id: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthPayload {
  token: string
  user: User
}
