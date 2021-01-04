import { AnyAction } from 'redux';
import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/rootState';
import { createAlert } from 'store/Alert/actions';
import * as api from 'services/api/categories';

import { Category } from 'types/models';

export const fetchCategoriesRequest = () =>
  action('Categories/FETCH_CATEGORIES_REQUEST');

export const fetchCategoriesSuccess = (payload: Array<Category>) =>
  action('Categories/FETCH_CATEGORIES_SUCCESS', payload);

export const fetchCategoriesFailure = () =>
  action('Categories/FETCH_CATEGORIES_FAILURE');

export const getCategories = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => async dispatch => {
  dispatch(fetchCategoriesRequest());
  try {
    const data = await api.getCategories();
    fetchCategoriesSuccess(data);
  } catch (e) {
    dispatch(createAlert({ content: e.message, type: 'error' }));
    dispatch(fetchCategoriesFailure());
  }
};

export type CategoryAction =
  | ActionType<typeof fetchCategoriesRequest>
  | ActionType<typeof fetchCategoriesSuccess>
  | ActionType<typeof fetchCategoriesFailure>;
