import { ThemeProvider } from '@material-ui/core';

import theme from './theme';

export default function provideThemeTo(component) {
  return (
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
}
