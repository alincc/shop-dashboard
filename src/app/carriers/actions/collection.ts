import { Action } from '@ngrx/store';
import { Carrier } from '../models/carrier';

export const ADD_SHIPPING = '[Collection] Add Shipping';
export const ADD_SHIPPING_SUCCESS = '[Collection] Add Shipping Success';
export const ADD_SHIPPING_FAIL = '[Collection] Add Shipping Fail';
export const REMOVE_SHIPPING = '[Collection] Remove Shipping';
export const REMOVE_SHIPPING_SUCCESS = '[Collection] Remove Shipping Success';
export const REMOVE_SHIPPING_FAIL = '[Collection] Remove Shipping Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

/**
 * Add Shipping to Collection Actions
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
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
