import { RootState } from 'store/rootState';
import { FetchStatus } from 'store/util/fetchStatus';

export const isFetching = (state: RootState) =>
  state.authentication.get('fetchStatus') === FetchStatus.fetching;
export const isFetched = (state: RootState) =>
  state.authentication.get('fetchStatus') === FetchStatus.fetched;
export const isAuth = (state: RootState) => state.authentication.get('isAuth');

export const isFetchedSession = (state: RootState) =>
  [FetchStatus.fetched, FetchStatus.errorFetching].includes(
    state.authentication.get('fetchSession')
  );
export const isFetchingSession = (state: RootState) =>
  state.authentication.get('fetchSession') === FetchStatus.fetching;
export const isSessionChecked = (state: RootState) =>
  state.authentication.get('checkedSession');
