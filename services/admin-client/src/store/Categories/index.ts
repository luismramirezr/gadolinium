import createState from 'store/util/createState';
import { CategoriesState } from './types';
import { FetchStatus } from '../util/fetchStatus';
import { CategoryAction } from './actions';

export const INITIAL_STATE = createState<CategoriesState>({
  fetchStatus: FetchStatus.notFetched,
  saveStatus: FetchStatus.notFetched,
  categories: [],
  category: null,
});

const categoriesReducer = (state = INITIAL_STATE, action: CategoryAction) => {
  switch (action.type) {
    case 'Categories/FETCH_CATEGORIES_REQUEST':
      return state.set('fetchStatus', FetchStatus.fetching);
    case 'Categories/FETCH_CATEGORIES_SUCCESS':
      return state.merge({
        fetchStatus: FetchStatus.fetched,
        categories: action.payload,
      });
    case 'Categories/FETCH_CATEGORIES_FAILURE':
      return state.set('fetchStatus', FetchStatus.errorFetching);
    default:
      return state;
  }
};

export default categoriesReducer;
