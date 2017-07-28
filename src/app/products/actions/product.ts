import { Action } from '@ngrx/store';
import { Product } from '../../model/interface';

export const SEARCH = '[Product] Search';
export const SEARCH_COMPLETE = '[Product] Search Complete';
export const LOAD = '[Product] Load';
export const SELECT = '[Product] Select';
export const SAVE = '[Product] Save';
export const SAVE_SUCCESS = '[Product] Save Success';
export const SAVE_FAIL = '[Product] Save Failure';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Product[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: Product) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: Product) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: Product) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Product) {}
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
