import { Action } from '@ngrx/store';
import { User } from '../../model/interface';
import { Authenticate } from '../models/user';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const LOGIN_GET_USER = '[Auth] Get User';
export const CHECK = '[Auth] Check';
export const GUEST_LOGIN = '[Auth] Guest Login';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: User, redirect: boolean }) {}
}

export class GetUser implements Action {
  readonly type = LOGIN_GET_USER;

  constructor(public payload: { user: boolean, redirect: boolean }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class CheckAuthAction implements Action {
  readonly type = CHECK;
}

export class GuestLoginAction implements Action {
  readonly type = GUEST_LOGIN;
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | GetUser
  | CheckAuthAction
  | GuestLoginAction;
