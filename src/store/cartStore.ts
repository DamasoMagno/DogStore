import { product } from '@/graphql/queries/product'
import { toast } from 'sonner'
import { create } from 'zustand'

interface CartsStorage {
  products: Product[]
  addCart: (product: ProductInput) => void
  removeCart: (productId: string) => void
  incrementCart: (productId: string) => void
  decrementCart: (productId: string) => void
}

interface ProductInput {
  id: string
  name: string
  photo: string
  price: number
  category: "gamepass" | "account"
}

interface Product {
  id: string
  name: string
  photo: string
  price: number
  quantity: number
  total: number
  category: "gamepass" | "account"
}

export const useCartsStorage = create<CartsStorage>((set, get) => ({
  products: [],

  addCart: (product: ProductInput) => {
    const oldProducts = get().products

    const diferentProductCategory = oldProducts.some((currentProduct) => currentProduct.category !== product.category)
    const productExistingOnCart = oldProducts.find((currentProduct) => currentProduct.id === product.id)

    if (productExistingOnCart) {
      return
    }

    if (diferentProductCategory) {
      throw new Error("Você não pode adicionar um gamepass e conta juntos")

    }

    const newProduct: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      photo: product.photo,
      quantity: 1,
      category: product.category,
      total: product.price * 1
    }

    oldProducts.push(newProduct)

    return set({ products: oldProducts })
  },

  incrementCart: (productId: string) => {
    const oldProducts = get().products

    const updateOldProducts = oldProducts.map(product => {
      return product.id === productId ? {
        ...product,
        quantity: product.quantity += 1,
        total: product.total += product.price
      } : product
    })

    return set({
      products: updateOldProducts,
    })
  },

  decrementCart: (productId: string) => {
    const oldProducts = get().products

    const productAlreadyRemoved = oldProducts.find(product => product.id === productId)

    if (productAlreadyRemoved && productAlreadyRemoved?.quantity <= 1) {
      return
    }

    const updateOldProducts = oldProducts.map(product => {
      return product.id === productId ? {
        ...product,
        quantity: product.quantity -= 1,
        total: product.total -= product.price
      } : product
    })

    return set({
      products: updateOldProducts,
    })
  },

  removeCart: (productId: string) => {
    const oldProducts = get().products

    const productsWithoutProductSelectById = oldProducts.filter(product => product.id !== productId)

    return set({
      products: productsWithoutProductSelectById,
    })
  },
}))