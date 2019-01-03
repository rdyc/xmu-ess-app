import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { GlobalFormat } from '@layout/types';
import { CardActionArea } from '@material-ui/core';
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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
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
      [theme.breakpoints.up(1600 + theme.spacing.unit * 3 * 2)]: {
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
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 6
    }
  });

interface INews {
  source: string;
  date: string;
  url: string;
  image: string;
  title: string;
  subHeader: string;
}

const news: INews[] = [
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-31',
    url: 'https://www.instagram.com/p/BsCuJSqjrQW/',
    image: 'https://scontent-sin6-2.cdninstagram.com/vp/1517ac38aff300b65b736c95c40a820e/5CC5BD88/t51.2885-15/sh0.08/e35/s750x750/47690400_1187119848111763_6320383304818229248_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com',
    title: 'Happy New Year 2019',
    subHeader: 'May the New Year bring to you warmth of love, and a light to guide your path towards a positive destination. Happy New Year 2019.'
  },
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-24',
    url: 'https://swa.co.id/swa/listed-articles/gandeng-equine-global-kpei-raih-iso-bidang-keamanan-informasi',
    image: 'https://scontent-sin6-1.cdninstagram.com/vp/d918b1dff38c3267469ca9c2d2b19830/5CC74E3B/t51.2885-15/sh0.08/e35/s640x640/47691260_475783666278840_7722909191769161728_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com',
    title: 'Merry Christmas 2018',
    subHeader: 'Wishing you a very Merry Christmas and Prosperous New Year. May Peace be your gift at Christmas and your blessing all year through.'
  },
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-21',
    url: 'https://www.instagram.com/p/BrpSzepD_P9/',
    image: 'https://scontent-sin6-1.cdninstagram.com/vp/8355ec017b6afa1e7e7e9a9c2fdcb8e9/5CC82A75/t51.2885-15/sh0.08/e35/s640x640/47320332_1973338742748281_5437556900294033408_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com',
    title: 'Friday Inspiring Presentation (FIP)',
    subHeader: 'Friday Inspiring Presentation (FIP) hari ini dibawakan oleh Antonius Bambang Saputro dengan judul “Aquascape”. Antonius menceritakan mengenai seni yg mengatur tanaman, air, batu, karang, kayu dan lain...'
  },
  {
    source: 'SWA - Business Update',
    date: '2018-11-29',
    url: 'https://swa.co.id/swa/business-update/equine-technologies-group-menjadi-icon-di-industri-ti-melalui-pengelolaan-sumber-daya-manusia-dan-teknologi',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2018/11/29140648/equine-4541.gif',
    title: 'EQUINE TECHNOLOGIES GROUP Menjadi Icon di Industri TI melalui Pengelolaan Sumber Daya Manusia dan Teknologi',
    subHeader: 'Lahirnya revolusi Industry 4.0 ditandai dengan penggunaan teknologi secara masif. Era ini memaksa perusahaan untuk berinovasi sejalan dengan perkembangan teknologi agar dapat bersaing dan bertumbuh....'
  },
  {
    source: 'SWA - Listed Articles',
    date: '2017-05-05',
    url: 'https://swa.co.id/swa/listed-articles/gandeng-equine-global-kpei-raih-iso-bidang-keamanan-informasi',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2017/05/KPEI-.jpg',
    title: 'Gandeng Equine Global, KPEI Raih ISO Bidang Keamanan Informasi',
    subHeader: 'Keberadaan dan keberlangsungan pasar modal kini semakin vital bagi perekonoman Indonesia. Alhasil, semua infrastruktur dan sistem pendukung pasar modal mesti dijaga dan dikelola sebaik-baiknya agar...'
  },
  {
    source: 'SWA - Profile',
    date: '2014-09-30',
    url: 'https://swa.co.id/swa/profile/eko-heryanto-tidak-ingin-berhenti-hanya-di-industri-ti',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2014/09/Eko-Heryanto.jpg.jpg',
    title: 'Eko Heryanto, Tidak Ingin Berhenti Hanya di Industri TI',
    subHeader: 'Sebagai seorang yang sudah kawakan di dunia IT, Eko Heryanto, CEO Equine Technologies Group, merasakan bahwa perbedaan era di dalam dunia kerja semakin signifikan. Dengan...'
  }
];

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
  & InjectedIntlProps
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
        <Grid container spacing={16}>
          {news.map((item, index) => (
            <Grid item key={index} sm={12} md={4} lg={4}>
              <Card square elevation={1} className={props.classes.card}>
                <CardActionArea href={item.url} target="_blank" disableRipple disableTouchRipple>
                  <CardMedia
                    className={props.classes.cardMedia}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent className={props.classes.cardContent}>
                    <Typography variant="caption">
                      {props.intl.formatDate(item.date, GlobalFormat.Date)} | {item.source}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" noWrap title={item.title}>
                      {item.title}
                    </Typography>
                    <Typography component="p">
                      {item.subHeader}
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
        Equine Technologies Group 2019
      </Typography>
    </footer>
  </React.Fragment>
);

export const Root = compose<AllProps, {}>(
  injectIntl,
  withRouter,
  withOidc,
  withUser,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(root);
