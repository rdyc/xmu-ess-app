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

interface OwnHandler {
  handleOnClickLogin: () => void;
  handleOnClickLogout: () => void;
}

interface OwnState {
  title: string;
  description: string;
  footer: string;
  isLoggedIn: boolean;
  user?: IAppUser;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setUser: StateHandler<OwnState>;
}

export type LandingPageProps 
  = RouteComponentProps 
  & InjectedIntlProps
  & WithOidc 
  & WithUser
  & WithStyles<typeof styles>
  & OwnState 
  & OwnStateUpdaters 
  & OwnHandler;

const createProps: mapper<LandingPageProps, OwnState> = (props: LandingPageProps): OwnState => ({
  isLoggedIn: false,
  title: process.env.REACT_APP_WEBSITE_NAME || 'Title',
  description: process.env.REACT_APP_WEBSITE_DESCRIPTION || 'Description',
  footer: process.env.REACT_APP_WEBSITE_FOOTER || 'Copyright',
});

const stateUpdaters: StateUpdaters<LandingPageProps, OwnState, OwnStateUpdaters> = {
  setUser: (prevState: OwnState, props: LandingPageProps) => (appUser: IAppUser): Partial<OwnState> => ({
    isLoggedIn: true,
    user: appUser
  })
};

const handlerCreators: HandleCreators<LandingPageProps, OwnHandler> = {
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
  componentDidMount() {
    // set document props
    document.title = 'Welcome to New TESSA';
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