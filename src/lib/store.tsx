'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { Product } from '@/sanity/lib/types'

type CartItem = {
  product: Product
  quantity: number
}

type State = {
  cart: CartItem[]
  wishlist: Product[]
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: State }

const initialState: State = {
  cart: [],
  wishlist: [],
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearCart: () => void
} | null>(null)

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        (item) => item.product._id === action.payload._id
      )

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.product._id !== action.payload),
      }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    case 'ADD_TO_WISHLIST': {
      const existingItem = state.wishlist.find(
        (item) => item._id === action.payload._id
      )

      if (existingItem) {
        return state
      }

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }

    case 'HYDRATE':
      return action.payload

    default:
      return state
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  useEffect(() => {
    const storedState = localStorage.getItem('store')
    if (storedState) {
      dispatch({ type: 'HYDRATE', payload: JSON.parse(storedState) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(state))
  }, [state])

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } })
  }

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
} 