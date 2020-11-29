import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  categoryCard: {
    width: '100%',
    height: 150,
  },
  categoryCardImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));
