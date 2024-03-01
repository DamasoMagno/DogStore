import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const productsQuery = gql`
  query Games {
    products(
      where: {jogo: {slug: "blox-fruit"}, categories_some: {slug: "account"}}
    ) {
      id
      name
      price
      image {
        url
      }
    }
  }
`

export interface IProducts {
  products: {
    id: string;
    name: string;
    image: {
      url: string;
    }
    price: number;
  }[]
}

export const products = async () =>
  await client.request<IProducts>(productsQuery)
