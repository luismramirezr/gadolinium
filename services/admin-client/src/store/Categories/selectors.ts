import { RootState } from 'store/rootState';
import { FetchStatus } from 'store/util/fetchStatus';

export const isFetching = (state: RootState) =>
  state.categories.get('fetchStatus') === FetchStatus.fetching;
export const isFetched = (state: RootState) =>
  state.categories.get('fetchStatus') === FetchStatus.fetched;

export const getCategories = (state: RootState) =>
  state.categories.get('categories');

export const getCategory = (state: RootState) =>
  state.categories.get('category');
