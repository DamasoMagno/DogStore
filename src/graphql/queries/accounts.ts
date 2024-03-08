import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const accountsQuery = gql`
  query Accounts($slug: String!, $category: String, $order: AccountOrderByInput) {
    accounts(
      where: {jogo: {slug: $slug}, category: {slug_starts_with: $category}}
      orderBy: $order
    ) {
      id
      name
      price
      slug
      image {
        url
      }
    }
  }
`

export interface IProducts {
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
  order?: "price_ASC" | "price_DESC"
  category?: string
}

export const accounts = async ({ slug, order, category = "" }: IProductProps) => {
  return await client.request<IProducts>(accountsQuery, {
    slug,
    order,
    category: category ? category : ""
  })
}
