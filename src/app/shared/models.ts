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
  password?: string | null,
  remember?: boolean | null
}
export interface Book {
  bookId?: any;
  title?: string | null,
  author?: string | null,
  genre?: string | null,
  price?: string | null,
  stock?: string | null
}
export type Books = Book[]

