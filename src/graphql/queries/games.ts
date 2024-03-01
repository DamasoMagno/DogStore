import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const gamesQuery = gql`
  {
    jogos {
      id
      slug
      banner {
        id
        url
      }
      nome
    }
  }
`

export interface IGames {
  jogos: {
    id: string,
    slug: string;
    nome: string
    banner: {
      id: string
      url: string;
    },
  }[]
}

export const games = async () => {
  const data = await client.request<IGames>(gamesQuery)
  return data
}

