import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    maxWidth: theme.breakpoints.values.sm / 2,
    width: '100%',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.getContrastText(theme.palette.grey[900]),
  },
  icon: {
    color: theme.palette.getContrastText(theme.palette.grey[900]),
    minWidth: 40,
  },
  logo: {
    width: '100%',
    height: 75,
    backgroundImage: 'url(/images/logo-white.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
}));
