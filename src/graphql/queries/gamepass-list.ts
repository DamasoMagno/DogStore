import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const accountsQuery = gql`
  query Accounts($slug: String!) {
    gamepasses (where: {name_contains: $slug}) {
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

interface IGamepasses {
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
}

export const gamepassList = async ({ slug }: IProductProps) => {
  return await client.request<IGamepasses>(accountsQuery, {
    slug,
  })
}
