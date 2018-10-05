import 'typeface-roboto';

import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';

// pick utils
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  }
});

// muiPickers override workaround
/*const muiPickers = {
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: orange['400'],
    }
  }
};

theme.overrides = Object.assign(muiPickers);*/

function withRoot(Component: React.ComponentType) {
  function fnWithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }

  return fnWithRoot;
}

export default withRoot;