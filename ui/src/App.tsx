import { MuiThemeProvider } from '@material-ui/core';

import SpectralScan from 'SpectralScan';

import { theme } from 'host/theme';
import { GlobalStyles } from 'host/GlobalStyles';

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <GlobalStyles />
    <SpectralScan />
  </MuiThemeProvider>
);
