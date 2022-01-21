import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItems);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(url);
      const responceData = await response.json();
      setIsLoading(false);
      setTotal(responceData.length);
      setCart(responceData);
    }
    fetchData();
  }, [])

  return (
    <AppContext.Provider
      value={{
        cart,
        total,
        isLoading
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
