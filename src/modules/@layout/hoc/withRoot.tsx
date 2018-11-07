import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';

import { WithLayout, withLayout } from './withLayout';

// pick utils
// A theme with custom primary and secondary color.
// It's optional.
// const theme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: orange,
//     type: 'dark'
//   }
// });

// muiPickers override workaround
/*const muiPickers = {
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: orange['400'],
    }
  }
};

theme.overrides = Object.assign(muiPickers);*/

// export const withRoot = (Component: React.ComponentType) => (props: any) => (
//   <MuiThemeProvider theme={theme}>
//     <MuiPickersUtilsProvider utils={MomentUtils}>
//       <CssBaseline />
//       <Component {...props} />
//     </MuiPickersUtilsProvider>
//   </MuiThemeProvider>
// );

const layoutThemeView: React.SFC<WithLayout> = props => (
  <MuiThemeProvider theme={createMuiTheme(props.layoutState.theme)}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <CssBaseline />
      {props.children}
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export const LayoutTheme = withLayout(layoutThemeView);