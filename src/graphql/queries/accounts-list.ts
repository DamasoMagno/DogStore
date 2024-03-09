import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const accountsQuery = gql`
  query Accounts($slug: String!) {
    accounts (where: {name_contains: $slug}) {
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

export interface IAccounts {
  accounts: {
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

export const accountsList = async ({ slug }: IProductProps) => {
  return await client.request<IAccounts>(accountsQuery, {
    slug,
  })
}
