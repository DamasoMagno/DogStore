import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { IProduct } from '@/interfaces'

const productQuery = gql`
  query Product($slug: String!){
    gamepass (where: {slug: $slug}) {
      id
      name
      price
      slug
      description {
        markdown
      }
      image {
        url
      }
    }
  }
`

export interface IProductInfo {
  gamepass: {
    id: string
    slug: string
    name: string
    price: number
    description: {
      markdown: string
    }
    image: {
      url: string
    }
  }
}

interface IProductQuery {
  slug: string
}

export const product = async ({ slug }: IProductQuery) => {
  const data = await client.request<IProductInfo>(productQuery, { slug })
  return data
}

