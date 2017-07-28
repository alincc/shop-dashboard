import { Action } from '@ngrx/store';

import { Order, OrderLine, AddProduct } from '../models/order';

export const SEARCH = '[Order] Search';
export const SEARCH_COMPLETE = '[Order] Search Complete';
export const LOAD = '[Order] Load';
export const SELECT = '[Order] Select';
export const SAVE = '[Order] Save';
export const SAVE_SUCCESS = '[Order] Save Success';
export const SAVE_FAIL = '[Order] Save Failure';
export const ADD_PRODUCT = '[Order] Add Product';
export const ADD_PRODUCT_SUCCESS = '[Order] Add Product Success';
export const ADD_PRODUCT_FAIL = '[Order] Add Product Fail';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Order[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: Order) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: Order) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: Order) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Order) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

export class AddProductAction implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: AddProduct) {}
}

export class AddProductSuccessAction implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: Order) {}
}

export class AddProductFailAction implements Action {
  readonly type = ADD_PRODUCT_FAIL;

  constructor(payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | SearchAction
  | SearchCompleteAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailAction
  | AddProductAction
  | AddProductSuccessAction
  | AddProductFailAction
  | LoadAction
  | SelectAction;
