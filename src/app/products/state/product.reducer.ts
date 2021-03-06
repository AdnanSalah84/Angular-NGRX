import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { InitializeCurrentProduct, ProductActionTypes, ToggleProductCode, ProductActions, CreateProductFail } from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  products: ProductState
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  //currentProduct: Product;
  currentProductId: number | number;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error:''
}

// Selector Functions
// const getProductFeatureState = createFeatureSelector <ProductState> ('products');

// export const getShowProductCode = createSelector(
//   getProductFeatureState,
//   state => state.showProductCode
// );

// export const getCurrentProductId = createSelector(
//   getProductFeatureState,
//   state => state.currentProductId
// );

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   getCurrentProductId,
//   (state, currentProductId) => {
//     if (currentProductId === 0) {
//       return {
//         id: 0,
//         productName: '',
//         productCode: 'New',
//         description: '',
//         starRating: 0
//       };
//     } else {
//       return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//     }
//   }
// );

// export const getProducts = createSelector(
//   getProductFeatureState,
//   state => state.products
// );

// export const getError = createSelector(
//   getProductFeatureState,
//   state => state.error
// );
//console.log('Existing state:' + JSON.stringify(state))
//console.log('Payload:' + action.payload)

export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

      case ProductActionTypes.InitializeCurrentProduct:
        return {
          ...state,
          currentProductId: 0
          // currentProduct: {
          //   id:0,
          //   productName:'',
          //   productCode:'new',
          //   description: '',
          //   starRating: 0
          // }
        };

      case ProductActionTypes.LoadSuccess:
        return {
          ...state,
          products: action.payload,
          error: ''
        };

      case ProductActionTypes.LoadFail:
        return {
          ...state,
          products:[],
          error: action.payload
        };

      case ProductActionTypes.UpdateProductSuccess:
        const updatedProducts = state.products.map(
          item => action.payload.id === item.id ? action.payload: item);
        return {
          ...state,
          products: updatedProducts,
          currentProductId: action.payload.id,
          error: ''
        };

      case ProductActionTypes.UpdateProductFail:
        return {
          ...state,
          error: action.payload
        };
      case ProductActionTypes.CreateProductSuccess :
        return {
          ...state,
          products: [...state.products, action.payload],
          currentProductId: action.payload.id,
          error: ''
        };
      case ProductActionTypes.CreateProductFail :
        return {
          ...state,
          error: action.payload
        };
      case ProductActionTypes.DeleteProductSuccess :
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };
      case ProductActionTypes.DeleteProductFail :
        return {
          ...state,
          error: action.payload
        };
    default:
      return state;
  }
}
