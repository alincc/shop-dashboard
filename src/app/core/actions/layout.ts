import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[Layout] Open Sidenav';
export const CLOSE_SIDENAV = '[Layout] Close Sidenav';
export const SELECT_ACTIVE_MENU = '[Layout] Select Active Menu';

export class OpenSidenavAction implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class SelectActiveMenuAction implements Action {
  readonly type = SELECT_ACTIVE_MENU;

  constructor(public payload: string) {}
}

export type Actions = OpenSidenavAction | CloseSidenavAction | SelectActiveMenuAction;
