import { ICart } from '@/interfaces'
import { create } from 'zustand'

export interface CartsStorage {
  cart: ICart
  setCartItem(): void
  incrementCartItem(): void
  decrementCartItem(): void
  removeCartItem(): void
}

export const useCartStorage = create<CartsStorage>((set, get) => ({
  cartItems: [],
  setCartItem: () => { },
  incrementCartItem: () => { },
  decrementCartItem: () => { },
  removeCartItment: () => { }
}))