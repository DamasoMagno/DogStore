import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const accountsQuery = gql`
  query Accounts($slug:String!) {
    account(where: {slug: $slug}) {
      id
      name
      email
      password
      price
      image {
        url
      }
    }
  }
`

export interface IProducts {
  account: {
    id: string
    name: string
    email: string
    password: string
    slug: string
    price: number
    image: {
      url: string
    }
  }
}

interface IProductProps {
  slug: string;
}

export const account = async ({ slug }: IProductProps) => {
  return await client.request<IProducts>(accountsQuery, {
    slug
  })
}
