import { useMemo } from 'react';
import { createStore, applyMiddleware, Store, CombinedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducers from 'store/rootReducer';

import { RootState } from 'store/rootState';

let store:
  | (Store<CombinedState<RootState>, any> & {
      dispatch: unknown;
    })
  | undefined;

const initStore = (initialState: RootState) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;
  return _store;
};

export const useStore = (initialState: RootState) => {
  const newStore = useMemo(() => initializeStore(initialState), [initialState]);
  return newStore;
};
