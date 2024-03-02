import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IGame, IProduct } from '@/interfaces';

const popularProductsQuery = gql`
  {
    categories {
      id
      name
      product(first: 16) {
        id
        name
        slug
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
    product: IProduct[]
  }[],
  jogos: IGame[]
}

export const popularProducts = async () =>
  await client.request<IPopularProducts>(popularProductsQuery)
