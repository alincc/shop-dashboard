import { Action } from '@ngrx/store';
import { Thread } from '../message';

export const ADD_THREAD = '[Thread Collection] Add Thread';
export const ADD_THREAD_SUCCESS = '[Thread Collection] Add Thread Success';
export const ADD_THREAD_FAIL = '[Thread Collection] Add Thread Fail';
export const REMOVE_THREAD = '[Thread Collection] Remove Thread';
export const REMOVE_THREAD_SUCCESS = '[Thread Collection] Remove Thread Success';
export const REMOVE_THREAD_FAIL = '[Thread Collection] Remove Thread Fail';
export const REMOVE_MANY_THREADS = '[Thread Collection] Remove Many Thread';
export const REMOVE_MANY_THREADS_SUCCESS = '[Thread Collection] Remove Many Thread Success';
export const REMOVE_MANY_THREADS_FAIL = '[Thread Collection] Remove Many Thread Fail';
export const LOAD = '[Thread Collection] Load';
export const LOAD_SUCCESS = '[Thread Collection] Load Success';
export const LOAD_FAIL = '[Thread Collection] Load Fail';

/**
 * Add Thread to Collection Actions
 */
export class AddThreadAction implements Action {
  readonly type = ADD_THREAD;

  constructor(public payload: Thread) {}
}

export class AddThreadSuccessAction implements Action {
  readonly type = ADD_THREAD_SUCCESS;

  constructor(public payload: Thread) {}
}

export class AddThreadFailAction implements Action {
  readonly type = ADD_THREAD_FAIL;

  constructor(public payload: Thread) {}
}

/**
 * Remove Thread from Collection Actions
 */
export class RemoveThreadAction implements Action {
  readonly type = REMOVE_THREAD;

  constructor(public payload: Thread) {}
}

export class RemoveThreadSuccessAction implements Action {
  readonly type = REMOVE_THREAD_SUCCESS;

  constructor(public payload: Thread) {}
}

export class RemoveThreadFailAction implements Action {
  readonly type = REMOVE_THREAD_FAIL;

  constructor(public payload: Thread) {}
}

/**
 * Remove Many from Collection Actions
 */
export class RemoveManyThreadsAction implements Action {
  readonly type = REMOVE_MANY_THREADS;

  constructor(public payload: string[]) {}
}

export class RemoveManyThreadsSuccessAction implements Action {
  readonly type = REMOVE_MANY_THREADS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyThreadsFailAction implements Action {
  readonly type = REMOVE_MANY_THREADS_FAIL;

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

  constructor(public payload: Thread[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddThreadAction
  | AddThreadSuccessAction
  | AddThreadFailAction
  | RemoveThreadAction
  | RemoveThreadSuccessAction
  | RemoveThreadFailAction
  | RemoveManyThreadsAction
  | RemoveManyThreadsSuccessAction
  | RemoveManyThreadsFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
