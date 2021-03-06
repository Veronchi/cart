import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  isLoading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'loading' })
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'display_items', payload: cart })
  }
  const clearCart = () => {
    dispatch({ type: 'clear_cart' })
  }
  const removeItem = (id) => {
    dispatch({ type: 'remove', payload: id })
  }
  const increase = (id) => {
    dispatch({ type: 'increase', payload: id })
  }
  const decrease = (id) => {
    dispatch({ type: 'decrease', payload: id })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'get_totals' })
  }, [state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
