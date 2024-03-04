import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { ICategory, IProduct } from '@/interfaces'

const productsQuery = gql`
  query Products($gameSlug: String!, $categorySlug: String!, $order: ProductOrderByInput) {
    category(where: {slug: $categorySlug}) {
      id
      name
      slug
    }
    products(
      orderBy: $order
      where: {jogo: {slug: $gameSlug}, categories_some: {slug: $categorySlug}}
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
  category: ICategory;
  products: IProduct[]
}

interface IProductProps {
  game: string;
  category: string;
  order?: "price_ASC" | "price_DESC"
}

export const products = async ({
  category,
  game,
  order
}: IProductProps) => {
  return await client.request<IProducts>(productsQuery, {
    gameSlug: game,
    categorySlug: category,
    order
  })
}
