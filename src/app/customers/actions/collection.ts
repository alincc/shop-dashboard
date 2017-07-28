import { Action } from '@ngrx/store';
import { Customer } from '../models/customer';

export const ADD_CUSTOMER = '[Customer Collection] Add Customer';
export const ADD_CUSTOMER_SUCCESS = '[Customer Collection] Add Customer Success';
export const ADD_CUSTOMER_FAIL = '[Customer Collection] Add Customer Fail';
export const REMOVE_CUSTOMER = '[Customer Collection] Remove Customer';
export const REMOVE_CUSTOMER_SUCCESS = '[Customer Collection] Remove Customer Success';
export const REMOVE_CUSTOMER_FAIL = '[Customer Collection] Remove Customer Fail';
export const REMOVE_MANY_CUSTOMERS = '[Customer Collection] Remove Many Customer';
export const REMOVE_MANY_CUSTOMERS_SUCCESS = '[Customer Collection] Remove Many Customer Success';
export const REMOVE_MANY_CUSTOMERS_FAIL = '[Customer Collection] Remove Many Customer Fail';
export const LOAD = '[Customer Collection] Load';
export const LOAD_SUCCESS = '[Customer Collection] Load Success';
export const LOAD_FAIL = '[Customer Collection] Load Fail';

/**
 * Add Customer to Collection Actions
 */
export class AddCustomerAction implements Action {
  readonly type = ADD_CUSTOMER;

  constructor(public payload: Customer) {}
}

export class AddCustomerSuccessAction implements Action {
  readonly type = ADD_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {}
}

export class AddCustomerFailAction implements Action {
  readonly type = ADD_CUSTOMER_FAIL;

  constructor(public payload: Customer) {}
}

/**
 * Remove Customer from Collection Actions
 */
export class RemoveCustomerAction implements Action {
  readonly type = REMOVE_CUSTOMER;

  constructor(public payload: Customer) {}
}

export class RemoveCustomerSuccessAction implements Action {
  readonly type = REMOVE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {}
}

export class RemoveCustomerFailAction implements Action {
  readonly type = REMOVE_CUSTOMER_FAIL;

  constructor(public payload: Customer) {}
}

/**
 * Remove Many from Collection Actions
 */
export class RemoveManyCustomersAction implements Action {
  readonly type = REMOVE_MANY_CUSTOMERS;

  constructor(public payload: string[]) {}
}

export class RemoveManyCustomersSuccessAction implements Action {
  readonly type = REMOVE_MANY_CUSTOMERS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyCustomersFailAction implements Action {
  readonly type = REMOVE_MANY_CUSTOMERS_FAIL;

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

  constructor(public payload: Customer[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddCustomerAction
  | AddCustomerSuccessAction
  | AddCustomerFailAction
  | RemoveCustomerAction
  | RemoveCustomerSuccessAction
  | RemoveCustomerFailAction
  | RemoveManyCustomersAction
  | RemoveManyCustomersSuccessAction
  | RemoveManyCustomersFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
