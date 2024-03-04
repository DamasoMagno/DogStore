import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IProduct } from '@/interfaces'

const productQuery = gql`
  query Product ($slug: String!){
    product(where: {slug: $slug}) {
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

interface IProductQuery {
  slug: string
}

export const product = async ({ slug }: IProductQuery) => {
  const data = await client.request<IProductInfo>(productQuery, { slug })
  return data
}

