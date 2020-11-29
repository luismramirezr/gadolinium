import { ThemeOptions } from '@material-ui/core/styles';

const theme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Sen, sans-serif',
    },
    h2: {
      fontFamily: 'Sen, sans-serif',
    },
    h3: {
      fontFamily: 'Sen, sans-serif',
    },
    h4: {
      fontFamily: 'Sen, sans-serif',
    },
    h5: {
      fontFamily: 'Sen, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Sen, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Sen, sans-serif',
    },
    body2: {
      fontFamily: 'Sen, sans-serif',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          'background-color': '#ffffff',
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true,
    },
    MuiIconButton: {
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true,
    },
  },
};

export default theme;
export { default as palette } from './palette';
