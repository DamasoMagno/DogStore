export interface IProduct {
  id: string
  name: string
  slug: string
  price: number
  image: {
    url: string
  }
}

export interface IGame {
  id: string;
  nome: string;
  slug: string;
  banner: {
    id: string;
    url: string;
  }
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICart {
  id: string
  title: string
  limit: number
  created_at: Date
}