import { Action } from '@ngrx/store';
import { OptionType } from '../../models/product';

export const ADD_OPTIONTYPE = '[OptionType Collection] Add OptionType';
export const ADD_OPTIONTYPE_SUCCESS = '[OptionType Collection] Add OptionType Success';
export const ADD_OPTIONTYPE_FAIL = '[OptionType Collection] Add OptionType Fail';
export const REMOVE_OPTIONTYPE = '[OptionType Collection] Remove OptionType';
export const REMOVE_OPTIONTYPE_SUCCESS = '[OptionType Collection] Remove OptionType Success';
export const REMOVE_OPTIONTYPE_FAIL = '[OptionType Collection] Remove OptionType Fail';
export const LOAD = '[OptionType Collection] Load';
export const LOAD_SUCCESS = '[OptionType Collection] Load Success';
export const LOAD_FAIL = '[OptionType Collection] Load Fail';

/**
 * Add OptionType to Collection Actions
 */
export class AddOptionTypeAction implements Action {
  readonly type = ADD_OPTIONTYPE;

  constructor(public payload: OptionType) {}
}

export class AddOptionTypeSuccessAction implements Action {
  readonly type = ADD_OPTIONTYPE_SUCCESS;

  constructor(public payload: OptionType) {}
}

export class AddOptionTypeFailAction implements Action {
  readonly type = ADD_OPTIONTYPE_FAIL;

  constructor(public payload: OptionType) {}
}

/**
 * Remove OptionType from Collection Actions
 */
export class RemoveOptionTypeAction implements Action {
  readonly type = REMOVE_OPTIONTYPE;

  constructor(public payload: any) {}
}

export class RemoveOptionTypeSuccessAction implements Action {
  readonly type = REMOVE_OPTIONTYPE_SUCCESS;

  constructor(public payload: any) {}
}

export class RemoveOptionTypeFailAction implements Action {
  readonly type = REMOVE_OPTIONTYPE_FAIL;

  constructor(public payload: OptionType) {}
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: OptionType[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddOptionTypeAction
  | AddOptionTypeSuccessAction
  | AddOptionTypeFailAction
  | RemoveOptionTypeAction
  | RemoveOptionTypeSuccessAction
  | RemoveOptionTypeFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
