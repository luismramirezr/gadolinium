import { useSelector } from 'react-redux';
import { RootState } from 'store/rootState';

export const useRootState = () =>
  useSelector((rootState: RootState) => rootState);
