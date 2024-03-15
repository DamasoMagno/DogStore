import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'

const accountsQuery = gql`
  {
    accounts(where: {jogo: {slug: "blox-fruit"}}) {
      id
      name
      price
      category {
        name
      }
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
    category: {
      name: string
    }
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
  const data = await client.request<IProducts>(accountsQuery, {
    slug,
    order,
    category: category ? category : ""
  })

  return data
}
