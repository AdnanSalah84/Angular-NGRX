import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products : ProductState
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products:[]
}

export function reducer(state = initialState, action): ProductState {
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
