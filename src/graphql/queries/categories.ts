import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const categoriesQuery = gql`
  {
    categories {
      id
      name
      slug
    }
  }
`

export interface ICategory {
  categories: {
    id: string;
    slug: string;
    name: string;
  }[]
}

interface IGamesProps {
  slug: string;
}

export const categories = async () => {
  const data = await client.request<ICategory>(categoriesQuery)
  return data
}

