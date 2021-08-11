import { createTheme } from '@material-ui/core';

import palette from './color';

const theme = createTheme({
  palette,
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  // fontFamily: font,
});

export default theme;
