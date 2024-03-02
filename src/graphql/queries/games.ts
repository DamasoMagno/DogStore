import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { ICategory, IGame } from '@/interfaces';

const gamesQuery = gql`
  query Games($slug: String!) {
    category(where: {slug: $slug}) {
      id
      name
      slug
    }
    jogos(where: {category_some: {slug: $slug}}) {
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
  category: ICategory;
  jogos: IGame[]
}

interface IGamesProps {
  slug: string;
}

export const games = async ({ slug }: IGamesProps) => {
  const data = await client.request<IGames>(gamesQuery, { slug })
  return data
}

