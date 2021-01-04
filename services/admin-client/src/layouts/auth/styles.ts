import { makeStyles } from '@material-ui/core/styles';

import logo from 'assets/images/background.jpg';

export default makeStyles(() => ({
  wrapper: {
    height: '100%',
    background: `url(${logo})`,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.25)',
    },
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
}));
