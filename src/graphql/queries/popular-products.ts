import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const popularProductsQuery = gql`
  {
    categories {
      id
      name
      product(first: 16) {
        id
        name
        image {
          url
        }
        price
      }
    }

    jogos(first: 16) {
      id
      nome
      slug
      banner {
        id
        url
      }
    }
  }
`

export interface IPopularProducts {
  categories: {
    id: string;
    name: string;
    product: {
      id: string;
      name: string;
      image: {
        url: string;
      }
      price: number;
    }[]
  }[],
  jogos: {
    id: string;
    nome: string;
    slug: string;
    banner: {
      id: string;
      url: string;
    }
  }[]
}

export const popularProducts = async () =>
  await client.request<IPopularProducts>(popularProductsQuery)
