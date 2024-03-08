import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const gameQuery = gql`
  query Gamepass($slug: String!) {
    game(where: {slug: $slug}) {
      id
      name
    }
  }
`

export interface IGame {
  game: {
    id: string
    name: string
  };
}

interface IProductProps {
  slug: string;
}

export const game = async ({
  slug,
}: IProductProps) => {
  return await client.request<IGame>(gameQuery, {
    slug
  })
}
