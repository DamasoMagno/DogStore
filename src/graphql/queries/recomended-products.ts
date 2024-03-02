import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IGame, IProduct } from '@/interfaces';

const recomendedProductsQuery = gql`
  {
    products(
      first: 12
      where: {jogo: {slug: "blox-fruit"}, categories_some: {slug: "account"}}
    ) {
      id
      name
      price
      slug
      image {
        url
      }
    }
  }
`

export interface IRecommendedProducts {
  products: IProduct[]
}

export const recomendedProducts = async () =>
  await client.request<IRecommendedProducts>(recomendedProductsQuery)
