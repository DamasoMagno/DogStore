import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const resumeQuery = gql`
  query Resume {
    gamepasses(first: 12) {
      id
      slug
      name
      price
      image {
        url
      }
    }

    accounts(first: 12) {
      id
      slug
      name
      price
      image {
        url
      }
    }

    games(first: 12) {
      id
      slug
      name
      banner {
        url
      }
    }
  }
`

export interface IPopularProducts {
  gamepasses: {
    id: string
    slug: string
    name: string
    price: number
    image: {
      url: string
    }
  }[]
  accounts: {
    id: string
    slug: string
    name: string
    price: number
    image: {
      url: string
    }
  }[]
  games: {
    id: string
    slug: string,
    name: string,
    banner: {
      url: string
    }
  }[]
}

export const resumeProducts = async () =>
  await client.request<IPopularProducts>(resumeQuery)
