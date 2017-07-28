import { Action } from '@ngrx/store';
import { Carrier } from '../models/carrier';

export const ADD_SHIPPING = '[Carrier Collection] Add Carrier';
export const ADD_SHIPPING_SUCCESS = '[Carrier Collection] Add Carrier Success';
export const ADD_SHIPPING_FAIL = '[Carrier Collection] Add Carrier Fail';
export const REMOVE_SHIPPING = '[Carrier Collection] Remove Carrier';
export const REMOVE_SHIPPING_SUCCESS = '[Carrier Collection] Remove Carrier Success';
export const REMOVE_SHIPPING_FAIL = '[Carrier Collection] Re_move Carrier Fail';
export const REMOVE_MANY_SHIPPING = '[Carrier Collection] Remove Many Carrier';
export const REMOVE_MANY_SHIPPING_SUCCESS = '[Carrier Collection] Remove Many Carrier Success';
export const REMOVE_MANY_SHIPPING_FAIL = '[Carrier Collection] Remove Many Carrier Fail';
export const LOAD = '[Carrier Collection] Load';
export const LOAD_SUCCESS = '[Carrier Collection] Load Success';
export const LOAD_FAIL = '[Carrier Collection] Load Fail';

/**
 * Add Carrier to Collection Actions
 */
export class AddShippingAction implements Action {
  readonly type = ADD_SHIPPING;

  constructor(public payload: Carrier) {}
}

export class AddShippingSuccessAction implements Action {
  readonly type = ADD_SHIPPING_SUCCESS;

  constructor(public payload: Carrier) {}
}

export class AddShippingFailAction implements Action {
  readonly type = ADD_SHIPPING_FAIL;

  constructor(public payload: Carrier) {}
}

/**
 * Remove Shipping from Collection Actions
 */
export class RemoveShippingAction implements Action {
  readonly type = REMOVE_SHIPPING;

  constructor(public payload: Carrier) {}
}

export class RemoveShippingSuccessAction implements Action {
  readonly type = REMOVE_SHIPPING_SUCCESS;

  constructor(public payload: Carrier) {}
}

export class RemoveShippingFailAction implements Action {
  readonly type = REMOVE_SHIPPING_FAIL;

  constructor(public payload: Carrier) {}
}

/**
 * Remove Many Shipping from Collection Actions
 */
export class RemoveManyShippingAction implements Action {
  readonly type = REMOVE_MANY_SHIPPING;

  constructor(public payload: string[]) {}
}

export class RemoveManyShippingSuccessAction implements Action {
  readonly type = REMOVE_MANY_SHIPPING_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyShippingFailAction implements Action {
  readonly type = REMOVE_MANY_SHIPPING_FAIL;

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

  constructor(public payload: Carrier[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddShippingAction
  | AddShippingSuccessAction
  | AddShippingFailAction
  | RemoveShippingAction
  | RemoveShippingSuccessAction
  | RemoveShippingFailAction
  | RemoveManyShippingAction
  | RemoveManyShippingSuccessAction
  | RemoveManyShippingFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
