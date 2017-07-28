import { Action } from '@ngrx/store';
import { Category } from '../../model/interface';

export const ADD_CATEGORY = '[Category Collection] Add Category';
export const ADD_CATEGORY_SUCCESS = '[Category Collection] Add Category Success';
export const ADD_CATEGORY_FAIL = '[Category Collection] Add Category Fail';
export const REMOVE_CATEGORY = '[Category Collection] Remove Category';
export const REMOVE_CATEGORY_SUCCESS = '[Category Collection] Remove Category Success';
export const REMOVE_CATEGORY_FAIL = '[Category Collection] Remove Category Fail';
export const REMOVE_MANY_CATEGORIES = '[Category Collection] Remove Many Category';
export const REMOVE_MANY_CATEGORIES_SUCCESS = '[Category Collection] Remove Many Category Success';
export const REMOVE_MANY_CATEGORIES_FAIL = '[Category Collection] Remove Many Category Fail';
export const LOAD = '[Category Collection] Load';
export const LOAD_SUCCESS = '[Category Collection] Load Success';
export const LOAD_FAIL = '[Category Collection] Load Fail';

/**
 * Add Category to Collection Actions
 */
export class AddCategoryAction implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: Category) {}
}

export class AddCategorySuccessAction implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;

  constructor(public payload: Category) {}
}

export class AddCategoryFailAction implements Action {
  readonly type = ADD_CATEGORY_FAIL;

  constructor(public payload: Category) {}
}

/**
 * Remove Category from Collection Actions
 */
export class RemoveCategoryAction implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload: Category) {}
}

export class RemoveCategorySuccessAction implements Action {
  readonly type = REMOVE_CATEGORY_SUCCESS;

  constructor(public payload: Category) {}
}

export class RemoveCategoryFailAction implements Action {
  readonly type = REMOVE_CATEGORY_FAIL;

  constructor(public payload: Category) {}
}

/**
 * Remove Many from Collection Actions
 */
export class RemoveManyCategoriesAction implements Action {
  readonly type = REMOVE_MANY_CATEGORIES;

  constructor(public payload: string[]) {}
}

export class RemoveManyCategoriesSuccessAction implements Action {
  readonly type = REMOVE_MANY_CATEGORIES_SUCCESS;

  constructor(public payload: string[]) {}
}

export class RemoveManyCategoriesFailAction implements Action {
  readonly type = REMOVE_MANY_CATEGORIES_FAIL;

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

  constructor(public payload: Category[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddCategoryAction
  | AddCategorySuccessAction
  | AddCategoryFailAction
  | RemoveCategoryAction
  | RemoveCategorySuccessAction
  | RemoveCategoryFailAction
  | RemoveManyCategoriesAction
  | RemoveManyCategoriesSuccessAction
  | RemoveManyCategoriesFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
