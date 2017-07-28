import { Action } from '@ngrx/store';
import { Order } from '../models/order';

export const ADD_ORDER = '[Order Collection] Add Order';
export const ADD_ORDER_SUCCESS = '[Order Collection] Add Order Success';
export const ADD_ORDER_FAIL = '[Order Collection] Add Order Fail';
export const REMOVE_ORDER = '[Order Collection] Remove Order';
export const REMOVE_ORDER_SUCCESS = '[Order Collection] Remove Order Success';
export const REMOVE_ORDER_FAIL = '[Order Collection] Remove Order Fail';
export const REMOVE_MANY_ORDERS = '[Order Collection] Remove Many Order';
export const REMOVE_MANY_ORDERS_SUCCESS = '[Order Collection] Remove Many Order Success';
export const REMOVE_MANY_ORDERS_FAIL = '[Order Collection] Remove Many Order Fail';
export const LOAD = '[Order Collection] Load';
export const LOAD_SUCCESS = '[Order Collection] Load Success';
export const LOAD_FAIL = '[Order Collection] Load Fail';

/**
 * Add Order to Collection Actions
 */
export class AddOrderAction implements Action {
  readonly type = ADD_ORDER;

  constructor(public payload: Order) {}
}

export class AddOrderSuccessAction implements Action {
  readonly type = ADD_ORDER_SUCCESS;

  constructor(public payload: Order) {}
}

export class AddOrderFailAction implements Action {
  readonly type = ADD_ORDER_FAIL;

  constructor(public payload: Order) {}
}

/**
 * Remove Order from Collection Actions
 */
export class RemoveOrderAction implements Action {
  readonly type = REMOVE_ORDER;

  constructor(public payload: Order) {}
}

export class RemoveOrderSuccessAction implements Action {
  readonly type = REMOVE_ORDER_SUCCESS;

  constructor(public payload: Order) {}
}

export class RemoveOrderFailAction implements Action {
  readonly type = REMOVE_ORDER_FAIL;

  constructor(public payload: Order) {}
}

/**
 * Remove Many from Collection Actions
 */
export class RemoveManyOrdersAction implements Action {
  readonly type = REMOVE_MANY_ORDERS;

  constructor(public payload: string[]) {}
}

export class RemoveManyOrdersSuccessAction implements Action {
  readonly type = REMOVE_MANY_ORDERS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyOrdersFailAction implements Action {
  readonly type = REMOVE_MANY_ORDERS_FAIL;

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

  constructor(public payload: Order[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddOrderAction
  | AddOrderSuccessAction
  | AddOrderFailAction
  | RemoveOrderAction
  | RemoveOrderSuccessAction
  | RemoveOrderFailAction
  | RemoveManyOrdersAction
  | RemoveManyOrdersSuccessAction
  | RemoveManyOrdersFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
