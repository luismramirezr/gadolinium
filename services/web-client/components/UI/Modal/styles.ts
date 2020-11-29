import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dialog: {
    top: -100,
  },
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  content: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  actions: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));
