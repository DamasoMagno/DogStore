import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IProduct } from '@/interfaces'

const productQuery = gql`
  query Product {
    product(where: {slug: "yama"}) {
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

export interface IProductInfo {
  product: IProduct
}

export const product = async () => {
  const data = await client.request<IProductInfo>(productQuery)
  return data
}

