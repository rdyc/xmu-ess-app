import 'typeface-roboto';

import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
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

const themeOverides: Partial<Theme> = {
  overrides: { 
    MuiCardHeader: {
      subheader: {
        fontSize: '85%'
      }
    },
    MuiExpansionPanelSummary: {
      expanded: {
        margin: 0
      }
    }
  }
};

const layoutThemeView: React.SFC<WithLayout> = props => (
  <MuiThemeProvider theme={
    createMuiTheme({
      ...props.layoutState.theme, 
      ...themeOverides
    })}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <CssBaseline />
      {props.children}
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export const LayoutTheme = withLayout(layoutThemeView);