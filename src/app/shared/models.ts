export interface Admin {
  customerId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  address?: string | null;
  city?: string | null;
  role?: string | null;
}

export interface User {
  customerId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  address?: string | null;
  city?: string | null;
  role?: string | null;
}

export interface Credentials {
  email?: string | null,
  password?: string |null,
  remember?:boolean | null
}
export interface Book {
  "bookId": number,
  "title": string,
  "author": string,
  "genre": string,
  "price": number,
  "stock": number
}
export type Books = Book[]

