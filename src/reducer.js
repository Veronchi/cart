const reducer = (state, action) => {
  if (action.type === 'loading') {
    return { ...state, isLoading: true }
  }
  if (action.type === 'display_items') {
    return { ...state, cart: action.payload, isLoading: false }
  }
  if (action.type === 'clear_cart') {
    return { ...state, cart: [] }
  }
  if (action.type === 'remove') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)
    }
  }
}

export default reducer