import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IProduct } from '@/interfaces'

const productsQuery = gql`
  query Games {
    products(
      where: {jogo: {slug: "blox-fruit"}, categories_some: {slug: "account"}}
    ) {
      id
      name
      slug
      price
      image {
        url
      }
    }
  }
`

export interface IProducts {
  products: IProduct[]
}

export const products = async () =>
  await client.request<IProducts>(productsQuery)
