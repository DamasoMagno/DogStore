import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const gamesQuery = gql`
  {
    games {
      id
      slug
      name
      banner {
        id
        url
      }
    }
  }
`

export interface IGames {
  games: {
    id: string;
    slug: string;
    name: string;
    banner: {
      id: string;
      url: string;
    }
  }[]
}

interface IGamesProps {
  slug: string;
}

export const games = async () => {
  const data = await client.request<IGames>(gamesQuery)
  return data
}

