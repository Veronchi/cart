import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItems);
  const [itemTotal, setItemTotal] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(url);
      const cartData = await response.json();

      setIsLoading(false);
      setCart(cartData);
      setItemTotal(cartData.length);
      setPriceTotal(calcTotalPrice(cartData));
    }
    fetchData();
  }, [])

  const calcTotalPrice = (arr) => {
    const totalPrice = arr.reduce((sum, item) => sum + Number.parseInt(item.price), 0);

    return totalPrice;
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        itemTotal,
        priceTotal,
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
