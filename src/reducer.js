const reducer = (state, action) => {
  if(action.type === 'loading') {
    return {...state, isLoading: true}
  }
  if(action.type === 'display_items') {
    return {...state, cart: action.payload, isLoading: false}
  }
}

export default reducer