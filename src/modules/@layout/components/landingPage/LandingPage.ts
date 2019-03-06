import AppEvent from '@constants/AppEvent';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { AppUserManager } from '../../../../utils';
import { LandingPageView } from './LandingPageView';

interface IOwnState {
  isUpdateAvailable: boolean;
  isLoggedIn: boolean;
  title: string;
  description: string;
  footer: string;
  user?: IAppUser;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setUser: StateHandler<IOwnState>;
  setUpdateAvailable: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnFoundUpdate: (event: CustomEvent) => void;
  handleOnClickLogin: () => void;
  handleOnClickLogout: () => void;
}

export type LandingPageProps 
  = RouteComponentProps 
  & InjectedIntlProps
  & WithOidc 
  & WithUser
  & WithStyles<typeof styles>
  & IOwnState 
  & IOwnStateUpdater 
  & IOwnHandler;

const createProps: mapper<LandingPageProps, IOwnState> = (props: LandingPageProps): IOwnState => ({
  isUpdateAvailable: false,
  isLoggedIn: false,
  title: process.env.REACT_APP_WEBSITE_NAME || 'Title',
  description: process.env.REACT_APP_WEBSITE_DESCRIPTION || 'Description',
  footer: process.env.REACT_APP_WEBSITE_FOOTER || 'Copyright',
});

const stateUpdaters: StateUpdaters<LandingPageProps, IOwnState, IOwnStateUpdater> = {
  setUpdateAvailable: (state: IOwnState) => (): Partial<IOwnState> => ({
    isUpdateAvailable: !state.isUpdateAvailable
  }),
  setUser: (state: IOwnState, props: LandingPageProps) => (appUser: IAppUser): Partial<IOwnState> => ({
    isLoggedIn: true,
    user: appUser
  })
};

const handlerCreators: HandleCreators<LandingPageProps, IOwnHandler> = {
  handleOnFoundUpdate: (props: LandingPageProps) => (event: CustomEvent) => {
    props.setUpdateAvailable();
  },
  handleOnClickLogin: (props: LandingPageProps) => () => {
    // check user login
    if (props.oidcState.user) {
      if (props.userState.user) {
        // user profile exist
        props.history.push('/home/dashboard');
      } else {
        // push to select user access
        props.history.push('/account/access');
      }
    } else {
      // AppUserManager.signinRedirect();
      AppUserManager.signinPopup()
        .catch(error => {
          console.error('error while logging in through the popup', error);
        });
    }
  },
  handleOnClickLogout: (props: LandingPageProps) => () => {
    AppUserManager.signoutRedirect();
    // AppUserManager.signoutPopup();
  }
};

const lifecycles: ReactLifeCycleFunctions<LandingPageProps, {}> = {
  componentWillMount() {
    // set document props
    document.title = 'Welcome to New TESSA';

    addEventListener(AppEvent.onFoundUpdate, this.props.handleOnFoundUpdate);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onFoundUpdate, this.props.handleOnFoundUpdate);
  }
};

export const LandingPage = compose<LandingPageProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  injectIntl
)(LandingPageView);