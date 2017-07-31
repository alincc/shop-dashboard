import { Action } from '@ngrx/store';
import { Thread, AddMessage } from '../message';

export const SEARCH = '[Thread] Search';
export const SEARCH_COMPLETE = '[Thread] Search Complete';
export const LOAD = '[Thread] Load';
export const SELECT = '[Thread] Select';
export const SAVE = '[Thread] Save';
export const SAVE_SUCCESS = '[Thread] Save Success';
export const SAVE_FAIL = '[Thread] Save Failure';
export const ADD_MESSAGE = '[Thread] Add Message';
export const ADD_MESSAGE_SUCCESS = '[Thread] Add Message Success';
export const ADD_MESSAGE_FAIL = '[Thread] Add Message Failure';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Thread[]) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor(public payload: Thread) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor(public payload: Thread) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAIL;

  constructor(public payload: Thread) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Thread) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: AddMessage) {}
}

export class AddMessageSuccessAction implements Action {
  readonly type = ADD_MESSAGE_SUCCESS;

  constructor(public payload: Thread) {}
}

export class AddMessageFailAction implements Action {
  readonly type = ADD_MESSAGE_FAIL;
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
  | SelectAction
  | AddMessageAction
  | AddMessageSuccessAction
  | AddMessageFailAction;
