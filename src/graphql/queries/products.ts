import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const gamepassQuery = gql`
  query Gamepass($slug: String!, $order: GamepassOrderByInput) {
    gamepasses(where: {jogo: {slug: $slug}}, orderBy: $order) {
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
  gamepasses: {
    id: string
    name: string
    slug: string
    price: number
    image: {
      url: string
    }
  }[]
}

interface IProductProps {
  slug: string;
  order?: "price_ASC" | "price_DESC"
}

export const products = async ({
  slug,
  order
}: IProductProps) => {
  return await client.request<IProducts>(gamepassQuery, {
    slug, order
  })
}
