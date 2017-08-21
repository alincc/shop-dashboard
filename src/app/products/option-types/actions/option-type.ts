import { Action } from '@ngrx/store';
import { OptionType } from '../../models/product';

export const SEARCH = '[OptionType] Search';
export const SEARCH_COMPLETE = '[OptionType] Search Complete';
export const LOAD = '[OptionType] Load';
export const SELECT = '[OptionType] Select';
export const SAVE = '[OptionType] Save';
export const SAVE_SUCCESS = '[OptionType] Save Success';
export const SAVE_FAIL = '[OptionType] Save Failure';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: OptionType[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: OptionType) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: OptionType) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: OptionType) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: OptionType) {}
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
