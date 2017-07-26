import { Action } from '@ngrx/store';
import { Carrier } from '../models/carrier';

export const SEARCH = '[Carrier] Search';
export const SEARCH_COMPLETE = '[Carrier] Search Complete';
export const LOAD = '[Carrier] Load';
export const SELECT = '[Carrier] Select';
export const SAVE = '[Carrier] Save';
export const SAVE_SUCCESS = '[Carrier] Save Success';
export const SAVE_FAIL = '[Carrier] Save Failure';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Carrier[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: Carrier) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: Carrier) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: Carrier) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Carrier) {}
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
