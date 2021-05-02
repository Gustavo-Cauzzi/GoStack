import { Reducer } from "react";
import produce from 'immer';
import { AnyAction } from "redux";
import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
}

const cart: Reducer<ICartState, AnyAction> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, draft => {
    switch(action.type){
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = state.items.findIndex(i => i.product.id === product.id);

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default cart;
