import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
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

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    appBar: {
      position: 'relative'
    },
    icon: {
      marginRight: theme.spacing.unit * 2
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    heroButtons: {
      marginTop: theme.spacing.unit * 4
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
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
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 6
    }
  });

const cards = [1, 2];

interface OwnHandler {
  handleOnClickLogin: () => void;
  handleOnClickLogout: () => void;
}

interface OwnState {
  isLoggedIn: boolean;
  user?: IAppUser;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setUser: StateHandler<OwnState>;
}

type AllProps 
  = RouteComponentProps 
  & WithOidc 
  & WithUser
  & WithStyles<typeof styles> 
  & OwnState 
  & OwnStateUpdaters 
  & OwnHandler;

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  isLoggedIn: false
});

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdaters> = {
  setUser: (prevState: OwnState, props: AllProps) => (
    appUser: IAppUser
  ): Partial<OwnState> => ({
    isLoggedIn: true,
    user: appUser
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleOnClickLogin: (props: AllProps) => () => {
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
  handleOnClickLogout: (props: AllProps) => () => {
    AppUserManager.signoutRedirect();
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
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
  }
};

const root: React.SFC<AllProps> = props => (
  <React.Fragment>
    <CssBaseline />

    <main>
      <div className={props.classes.heroUnit}>
        <div className={props.classes.heroContent}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
          >
            Welcome to new TESSA
          </Typography>

          <Typography
            variant="subheading"
            align="center"
            color="textSecondary"
            paragraph
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <div className={props.classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                {
                  props.oidcState.isLoadingUser &&
                  <Typography variant="body2">
                    <FormattedMessage id="layout.text.loading" />
                  </Typography>
                }

                {
                  !props.oidcState.isLoadingUser &&
                  props.oidcState.user &&
                  props.userState.user &&
                  <React.Fragment>
                    <Button
                      className={props.classes.button}
                      // variant="contained"
                      color="primary"
                      onClick={() => props.handleOnClickLogin()}
                    >
                      {`Hi ${props.userState.user && props.userState.user.fullName}, Let's start!`}
                    </Button>

                    <Button
                      className={props.classes.button}
                      color="secondary"
                      onClick={() => props.handleOnClickLogout()}
                    >
                      Logout
                    </Button>
                  </React.Fragment>
                }

                {
                  !props.oidcState.isLoadingUser &&
                  !props.oidcState.user &&
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleOnClickLogin()}
                  >
                    Let me in
                  </Button>
                }
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className={classNames(props.classes.layout, props.classes.cardGrid)}>
        {/* End hero unit */}
        <Grid container spacing={40}>
          {cards.map(card => (
            <Grid item key={card} sm={12} md={6} lg={6}>
              <Card className={props.classes.card}>
                <CardMedia
                  className={props.classes.cardMedia}
                  // tslint:disable-next-line:max-line-length
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  title="Image title"
                />
                <CardContent className={props.classes.cardContent}>
                  <Typography gutterBottom variant="display3" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>

    <footer className={props.classes.footer}>
      <Typography variant="body2" align="center" gutterBottom>
        All New Tessa
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        component="p"
      >
        Equine Technologies Group
      </Typography>
    </footer>
  </React.Fragment>
);

export const Root = compose<AllProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(root);
