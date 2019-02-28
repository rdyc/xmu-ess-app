import 'typeface-roboto';

import AppEvent from '@constants/AppEvent';
import AppStorage from '@constants/AppStorage';
import MomentUtils from '@date-io/moment';
import { PaletteType } from '@material-ui/core';
import { indigo, orange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, Direction, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as store from 'store';

import { WithUser, withUser } from './withUser';

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

const themeOverides: Partial<Theme> =  {
  overrides: { 
    // MuiAppBar: {
    //   colorDefault: {
    //     backgroundColor: grey[700],
    //     colorInterpolation: 'auto'
    //   }
    // },
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

const customMuiTheme = (direction?: Direction, type?: PaletteType): Theme => createMuiTheme({
  direction: direction || 'ltr',
  palette: {
    primary: indigo,
    secondary: orange,
    type: type || 'light'
  },
  typography: {
    useNextVariants: true,
  }, 
  ...themeOverides,
});

interface IOwnOption {

}

interface IOwnState {
  direction: Direction;
  type: PaletteType;
  theme: Theme;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setTheme: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangeTheme: (event: CustomEvent) => void;
  handleOnChangeAnchor: (event: CustomEvent) => void;
}

type LayoutThemeProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser;

const createProps: mapper<LayoutThemeProps, IOwnState> = (props: LayoutThemeProps): IOwnState => ({
  direction: 'ltr',
  type: 'light',
  theme: customMuiTheme('ltr', 'light')
});

const stateUpdaters: StateUpdaters<LayoutThemeProps, IOwnState, IOwnStateUpdater> = {
  setTheme: (state: IOwnState) => (direction: Direction, type: PaletteType): Partial<IOwnState> => ({
    direction,
    type,
    theme: customMuiTheme(direction, type)
  })
};

const handlerCreators: HandleCreators<LayoutThemeProps, IOwnHandler> = {
  handleOnChangeTheme: (props: LayoutThemeProps) => (event: CustomEvent) => {
    const direction = props.direction;
    const type = props.theme.palette.type === 'light' ? 'dark' : 'light';

    // set theme state
    props.setTheme(direction, type);

    // save local preference
    store.set(`${AppStorage.Preference}:${props.userState.user && props.userState.user.uid}`, {
      theme: type,
      anchor: direction
    });
  },
  handleOnChangeAnchor: (props: LayoutThemeProps) => (event: CustomEvent) => {
    const direction = props.direction === 'ltr' ? 'rtl' : 'ltr';
    const type = props.theme.palette.type;

    // set theme state
    props.setTheme(direction, type);

    // save local preference
    store.set(`${AppStorage.Preference}:${props.userState.user && props.userState.user.uid}`, {
      theme: type,
      anchor: direction
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<LayoutThemeProps, IOwnState> = {
  componentWillMount() {
    addEventListener(AppEvent.onChangeTheme, this.props.handleOnChangeTheme);
    addEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
  },
  componentDidUpdate(prevProps: LayoutThemeProps) {
    if (this.props.userState.user && this.props.userState.user !== prevProps.userState.user) {
      // get user preference
      const preference = store.get(`${AppStorage.Preference}:${this.props.userState.user && this.props.userState.user.uid}`);

      if (preference) {
        // set theme state
        this.props.setTheme(preference.anchor, preference.theme);
      }
    }
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeTheme, this.props.handleOnChangeTheme);
    removeEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
  }
};

const LayoutThemeView: React.SFC<LayoutThemeProps> = props => (
  <MuiThemeProvider theme={props.theme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <CssBaseline />
      {props.children}
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export const LayoutTheme = compose<LayoutThemeProps, IOwnOption>(
  withUser,
  setDisplayName('LayoutTheme'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LayoutThemeView);