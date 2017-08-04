import { Action } from '@ngrx/store';
import { Settings, SettingsProperty } from '../models/settings';

export const LOAD = '[Settings Collection] Load';
export const LOAD_SUCCESS = '[Settings Collection] Load Success';
export const LOAD_FAIL = '[Settings Collection] Load Fail';
export const UPDATE_PROPERTY = '[Settings] Update Property';
export const UPDATE_PROPERTY_SUCCESS = '[Settings] Update Property Success';
export const UPDATE_PROPERTY_FAIL = '[Settings] Update Property Fail';
export const SELECT_PAGE = '[Settings] Select Page';

export class UpdateSettingsAction implements Action {
  readonly type = UPDATE_PROPERTY;

  constructor(public payload: any) {}
}

export class UpdateSettingsSuccessAction implements Action {
  readonly type = UPDATE_PROPERTY_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateSettingsFailAction implements Action {
  readonly type = UPDATE_PROPERTY_FAIL;

  constructor(public payload: any) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Settings) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export class SelectPageAction implements Action {
  readonly type = SELECT_PAGE;

  constructor(public payload: string) {}
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UpdateSettingsAction
  | UpdateSettingsSuccessAction
  | UpdateSettingsFailAction
  | SelectPageAction;
