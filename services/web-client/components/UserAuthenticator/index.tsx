import React from 'react';
import { useDispatch } from 'react-redux';
import { checkSession } from 'store/Authentication/actions';
import * as AuthenticationSelectors from 'store/Authentication/selectors';
import { useRootState } from 'store/util/useRootState';

const UserAuthenticator: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const state = useRootState();
  const isFetchingSession = AuthenticationSelectors.isFetchingSession(state);
  const isSessionChecked = AuthenticationSelectors.isSessionChecked(state);

  React.useEffect(() => {
    if (!isSessionChecked && !isFetchingSession) {
      dispatch(checkSession());
    }
  });
  return <>{children}</>;
};

export default UserAuthenticator;
