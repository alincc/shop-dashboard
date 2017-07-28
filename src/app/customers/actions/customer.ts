import { Action } from '@ngrx/store';
import { Customer } from '../models/customer';

export const SEARCH = '[Customer] Search';
export const SEARCH_COMPLETE = '[Customer] Search Complete';
export const LOAD = '[Customer] Load';
export const SELECT = '[Customer] Select';
export const SAVE = '[Customer] Save';
export const SAVE_SUCCESS = '[Customer] Save Success';
export const SAVE_FAIL = '[Customer] Save Failure';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Customer[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: Customer) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: Customer) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: Customer) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Customer) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
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
  | LoadAction
  | SelectAction;
