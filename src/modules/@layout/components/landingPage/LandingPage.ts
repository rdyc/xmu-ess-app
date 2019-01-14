import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
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

import { WithLandingPage, withLandingPage } from '@layout/hoc/withLandingPage';
import { AppUserManager } from '../../../../utils';
import { LandingPageView } from './LandingPageView';

const styles = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit
  },
  header: {
    backgroundColor: theme.palette.grey[900],
    display: 'flex',
    position: 'fixed',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing.unit * 2,
    width: '100%',
    zIndex: 2,
    opacity: 0.5
  },
  flex: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundImage: 'url("https://demos.creative-tim.com/material-kit-pro-react/static/media/bg8.8cfdd67a.jpg")',
    backgroundSize: 'cover',
    height: '100vh',
    maxHeight: '1600px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  heroContent: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroText: {
    width: '50%',
    color: '#FFF',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing.unit * 3
    }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('lg')]: {
      width: 1600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.grey[800],
    color: '#FFF',
    padding: theme.spacing.unit * 6
  }
});

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
  & OwnHandler
  & WithLandingPage;

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
      AppUserManager.signinRedirect();
    }
  },
  handleOnClickLogout: (props: LandingPageProps) => () => {
    AppUserManager.signoutRedirect();
  }
};

const lifecycles: ReactLifeCycleFunctions<LandingPageProps, {}> = {
  componentDidMount() {
    // set document props
    document.title = 'Welcome to New TESSA';

    // load odic user state
    // loadUser(rootStore, AppUserManager).then((user: User) => {
    //   // console.log('loaded user', user);

    //   if (user) {
    //     // found user access, then get user profile
    //     const appUser: IAppUser = store.get(AppStorage.Profile);

    //     this.props.setUser(appUser);
    //   }
    // });

    const { isLoading, response } = this.props.landingPageState.all;
    const { loadAllRequest } = this.props.landingPageDispatch;
    
    if (!isLoading && !response) {
      loadAllRequest({});
    }
  }
};

export const LandingPage = compose<LandingPageProps, {}>(
  injectIntl,
  withLandingPage,
  withRouter,
  withOidc,
  withUser,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LandingPageView);