export function reducer(state, action) {
  switch (action.type) {

    case 'TOGGLE_PRODUCT_CODE':
    console.log('Existing state:' + JSON.stringify(state))
    console.log('Payload:' + action.payload)
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
