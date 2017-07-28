import { Action } from '@ngrx/store';
import { Product } from '../../model/interface';
import { ProductRemove } from '../models/product';

export const ADD_PRODUCT = '[Product Collection] Add Product';
export const ADD_PRODUCT_SUCCESS = '[Product Collection] Add Product Success';
export const ADD_PRODUCT_FAIL = '[Product Collection] Add Product Fail';
export const REMOVE_PRODUCT = '[Product Collection] Remove Product';
export const REMOVE_PRODUCT_SUCCESS = '[Product Collection] Remove Product Success';
export const REMOVE_PRODUCT_FAIL = '[Product Collection] Remove Product Fail';
export const REMOVE_MANY_PRODUCTS = '[Product Collection] Remove Many Product';
export const REMOVE_MANY_PRODUCTS_SUCCESS = '[Product Collection] Remove Many Product Success';
export const REMOVE_MANY_PRODUCTS_FAIL = '[Product Collection] Remove Many Product Fail';
export const LOAD = '[Product Collection] Load';
export const LOAD_SUCCESS = '[Product Collection] Load Success';
export const LOAD_FAIL = '[Product Collection] Load Fail';
export const RESTORE = '[Product Collection] Restore';
export const RESTORE_SUCCESS = '[Product Collection] Restore Success';
export const RESTORE_FAIL = '[Product Collection] Restore Fail';

/**
 * Add Product to Collection Actions
 */
export class AddProductAction implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class AddProductSuccessAction implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class AddProductFailAction implements Action {
  readonly type = ADD_PRODUCT_FAIL;

  constructor(public payload: Product) {}
}

/**
 * Remove Product from Collection Actions
 */
export class RemoveProductAction implements Action {
  readonly type = REMOVE_PRODUCT;

  constructor(public payload: ProductRemove) {}
}

export class RemoveProductSuccessAction implements Action {
  readonly type = REMOVE_PRODUCT_SUCCESS;

  constructor(public payload: ProductRemove) {}
}

export class RemoveProductFailAction implements Action {
  readonly type = REMOVE_PRODUCT_FAIL;

  constructor(public payload: Product) {}
}

/**
 * Remove Many from Collection Actions
 */
export class RemoveManyProductsAction implements Action {
  readonly type = REMOVE_MANY_PRODUCTS;

  constructor(public payload: string[]) {}
}

export class RemoveManyProductsSuccessAction implements Action {
  readonly type = REMOVE_MANY_PRODUCTS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyProductsFailAction implements Action {
  readonly type = REMOVE_MANY_PRODUCTS_FAIL;

  constructor(public payload: string[]) {}
}


/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

/**
 * Restore Collection Actions
 */
export class RestoreAction implements Action {
  readonly type = RESTORE;

  constructor(public payload: Product) {}
}

export class RestoreSuccessAction implements Action {
  readonly type = RESTORE_SUCCESS;

  constructor(public payload: Product) {}
}

export class RestoreFailAction implements Action {
  readonly type = RESTORE_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddProductAction
  | AddProductSuccessAction
  | AddProductFailAction
  | RemoveProductAction
  | RemoveProductSuccessAction
  | RemoveProductFailAction
  | RemoveManyProductsAction
  | RemoveManyProductsSuccessAction
  | RemoveManyProductsFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | RestoreAction
  | RestoreSuccessAction
  | RestoreFailAction;
