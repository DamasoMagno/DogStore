import { gql } from 'graphql-request'
import { client } from '@/lib/graphql'
import { ICategory, IProduct } from '@/interfaces'

const productsQuery = gql`
  query Products ($gameSlug: String!, $categorySlug: String!) {
    category(where: {slug: $categorySlug}) {
      id
      name
    }
    products(
      where: {
        jogo: {
          slug: $gameSlug
        }, 
        categories_some: {
          slug: $categorySlug
        }}
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
}

export const products = async ({
  category,
  game
}: IProductProps) =>
  await client.request<IProducts>(productsQuery, {
    gameSlug: game,
    categorySlug: category
  })
