import { createStyles, Theme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

import Background1 from './image/background/1.png';
import Background2 from './image/background/2.png';
import NavHeader from './image/headers/sm/0.svg';
import AchievementIcon from './image/icons/achievement.png';
import EventIcon from './image/icons/event.png';
import NewsIcon from './image/icons/news.png';
import EquineLogo from './image/logo/equine-logo.png';
import TessaLogo from './image/logo/tessa-logo.png';

// import sidebar from './image/sidebar/satrio-tower.jpg';
const drawerWidth = 300;

const size = {
  thin: 1,
  wide: 2,
  far: 3
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 0,
      zIndex: 1,
      overflow: 'hidden'
    },

    /* LOGOS */
    logoEquine: {
      height: 150,
      backgroundImage: `url("${EquineLogo}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    logoTessa: {
      height: 150,
      backgroundImage: `url("${TessaLogo}")`,
      backgroundRepeat: 'no-repeat',
    },

    /* ICONS */
    iconNews: {
      height: 80,
      backgroundImage: `url("${NewsIcon}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    iconAchievement: {
      height: 80,
      backgroundImage: `url("${AchievementIcon}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    iconEvent: {
      height: 80,
      backgroundImage: `url("${EventIcon}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },

    /* FOOTER */
    footer: {
      backgroundColor: theme.palette.grey[800],
      color: '#FFF',
      padding: theme.spacing.unit * 6
    },

    /* HERO */
    heroHeader: {
      backgroundColor: theme.palette.grey[900],
      display: 'flex',
      position: 'fixed',
      color: theme.palette.primary.contrastText,
      padding: theme.spacing.unit * 2,
      width: '100%',
      zIndex: 2,
      opacity: 0.5
    },
    heroUnit: {
      backgroundColor: '#333',
      backgroundImage: `url("${Background1}")`,
      backgroundSize: 'cover',
      height: '100vh',
      maxHeight: '1600px',
      display: 'flex',
      position: 'relative',
      alignItems: 'center'
    },
    heroContent: {
      maxWidth: 1200,
      margin: '-200px auto 0 auto',
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
    heroSummary: {
      background: theme.palette.background.default,
      margin: '-150px auto 0 auto',
      position: 'relative',
      maxWidth: 1200,
      justifyContent: 'center'
    },
    heroSummaryImage: {
      margin: '0 auto',
      padding: theme.spacing.unit * 3,
      display: 'flex'
    },
    heroSummaryContent: {
      marginBottom: theme.spacing.unit * 3
    },
    heroSummaryContentLink: {
      textDecoration: 'none',
    },
    heroSection: {
      maxWidth: 1200,
      margin: `${theme.spacing.unit * 3}px auto`,
      [theme.breakpoints.down('md')]: {
        maxWidth: window.outerWidth
      }
    },

    /* ACCESS */
    accessContainer: {
      backgroundColor: '#333',
      backgroundImage: `url("${Background2}")`,
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      overflow: 'hidden'
    },
    accessContent: {
      backgroundColor: lightBlue[500],
      padding: theme.spacing.unit * 3,
      color: '#FFF',
      display: 'flex',
    },

    // Application Bar
    appBar: {
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.background.default,
        width: `calc(100% - ${0}px)`,
        marginLeft: 0,
        marginRight: 0,
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarSearch: {
      backgroundColor: theme.palette.background.paper
    },
    appBarSearchField: {
      backgroundColor: theme.palette.background.paper
    },
    appBarShiftLeft: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginRight: 0,
      }
    },
    appBarShiftRight: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: 0,
        marginRight: drawerWidth
      }
    },
    appBarDialog: {
      position: 'relative'
    },

    // App Tabs
    tabs: {
      backgroundColor: theme.palette.primary.light
    },

    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    drawerInner: {
      // Make the items inside not wrap when transitioning:
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerHeaderMini: {
      marginTop: '65px',
      justifyContent: 'flex-start'
    },
    drawerPaper: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
    },
    drawerPaperBackground: {
      // backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.grey[900],
      // color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.grey[900]),
    },
    drawerPaperBackgroundImage: {
      // background: `linear-gradient(rgba(0,130,170,0), ${theme.palette.primary.main}), url(${sidebar})`,
      background: `linear-gradient(rgba(0,130,170,0), ${theme.palette.primary.main}))`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      opacity: .2,
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block'
    },
    drawerPaperAdditional: {
      width: drawerWidth
    },
    drawerPaperClose: {
      width: 60,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    drawerPaperMenuItem: {
      color: 'inherit',
    },
    drawerPaperMenuItemSub: {
      marginLeft: theme.spacing.unit * 7
    },
    drawerPaperFooter: {
      bottom: theme.spacing.unit * 2
    },

    // branding
    brandingContainer: {
      flex: 1,
      background: `url(${NavHeader})`,
      backgroundColor: theme.palette.background.paper,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'inherit',
      color: theme.palette.text.primary
    },

    // avatar
    avatarSecondary: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark
    },
    avatarRed: {
      color: '#fff',
      backgroundColor: red[500],
      // fontSize: theme.typography.fontSize / 1.1
    },

    // flex
    flex: {
      flex: 1
    },

    // content
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up('md')]: {
        // marginTop: theme.spacing.unit * 8,
      },
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        marginTop: theme.spacing.unit * 7,
      }
    },
    contentShiftLeft: {
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerWidth
      },
    },
    contentShiftRight: {
      [theme.breakpoints.up('md')]: {
        marginRight: drawerWidth
      },
    },
    contentWithBottomNav: {
      marginBottom: theme.spacing.unit * 7
    },

    bottomNavigation: {
      width: `calc(100% - ${0}px)`,
      position: 'fixed',
      display: 'flex',
      bottom: 0,
      right: 0,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },

    menuActive: {
      // backgroundColor: theme.palette.background.appBar
    },
    subHeader: {
      background: theme.palette.background.paper
      // zIndex: theme.zIndex.navDrawer + 1
    },
    /* Color page start */
    name: {
      marginBottom: 60
    },
    blockSpace: {
      height: 4
    },
    colorContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    colorGroup: {
      padding: '16px 0',
      margin: '0 15px 0 0',
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 0,
        width: '30%'
      }
    },
    colorValue: {
      ...theme.typography.caption,
      color: 'inherit',
      fontWeight: 'inherit'
    },
    //   themeInherit: {
    //     ...theme.typography,
    //     fontWeight: 500,
    //   },
    /* Color page end */

    /* Stepper */
    stepper: {
      // marginTop: '-48px',
      // position: 'relative',
      // // opacity: 0.4
      // background: 'none',
      // backgroundColor: 'none'
    },
    stepperImg: {
      height: 600,
      width: '100%',
      overflow: 'hidden',
      display: 'block',
    },

    /* Expander */
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    /* grid card */
    gridCard: {
      minWidth: 350
    },

    /* -------- generic classes start----------*/
    /* positioning */
    absoluteTopRight: {
      display: 'flex',
      position: 'absolute',
      
      right: theme.spacing.unit * 2,
    },

    fixedBotomRight: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },

    /* force right */
    forceRight: { float: 'right' },
    
    /* margin disabled */
    marginDisabled: { margin: 0 },

    /* margin thin */
    marginThin: { margin: theme.spacing.unit * size.thin },
    marginThinLeft: { marginLeft: theme.spacing.unit * size.thin },
    marginThinTop: { marginTop: theme.spacing.unit * size.thin },
    marginThinRight: { marginRight: theme.spacing.unit * size.thin },
    marginThinBottom: { marginBottom: theme.spacing.unit * size.thin },
    
    /* margin wide */
    marginWide: { margin: theme.spacing.unit * size.wide },
    marginWideLeft: { marginLeft: theme.spacing.unit * size.wide },
    marginWideTop: { marginTop: theme.spacing.unit * size.wide },
    marginWideRight: { marginRight: theme.spacing.unit * size.wide },
    marginWideBottom: { marginBottom: theme.spacing.unit * size.wide },
    
    /* margin far */
    marginFar: { margin: theme.spacing.unit * size.far },
    marginFarLeft: { marginLeft: theme.spacing.unit * size.far },
    marginFarTop: { marginTop: theme.spacing.unit * size.far },
    marginFarRight: { marginRight: theme.spacing.unit * size.far },
    marginFarBottom: { marginBottom: theme.spacing.unit * size.far },
    
    /* padding disabled */
    paddingDisabled: { padding: 0 },

    /* padding thin */
    paddingThin: { padding: theme.spacing.unit * size.thin },
    paddingThinLeft: { paddingLeft: theme.spacing.unit * size.thin },
    paddingThinTop: { paddingTop: theme.spacing.unit * size.thin },
    paddingThinRight: { paddingRight: theme.spacing.unit * size.thin },
    paddingThinBottom: { paddingBottom: theme.spacing.unit * size.thin },
    
    /* padding wide */
    paddingWide: { padding: theme.spacing.unit * size.wide },
    paddingWideLeft: { paddingLeft: theme.spacing.unit * size.wide },
    paddingWideTop: { paddingTop: theme.spacing.unit * size.wide },
    paddingWideRight: { paddingRight: theme.spacing.unit * size.wide },
    paddingWideBottom: { paddingBottom: theme.spacing.unit * size.wide },

    /* padding far */
    paddingFar: { padding: theme.spacing.unit * size.far },
    paddingFarLeft: { paddingLeft: theme.spacing.unit * size.far },
    paddingFarTop: { paddingTop: theme.spacing.unit * size.far },
    paddingFarRight: { paddingRight: theme.spacing.unit * size.far },
    paddingFarBottom: { paddingBottom: theme.spacing.unit * size.far },

    /* colors */
    colorRed: { color: red['500'] },

    /* text */
    textStrikethrough : { textDecoration: 'line-through' },

    /* report */
    reportPaper: {
      overflowX: 'auto',
      height: `calc(100vh - 96px - 72px)`,
    },
    reportPaperPartial: {
      width: `calc(100vw - 32px - ${drawerWidth}px)`
    },
    reportPaperMobile: {
      overflowX: 'auto',
      height: `calc(100vh - 56px - 68px)`,
    },
    reportPaperPartialMobile: {
      width: `calc(100vw)`,
    },
    reportContentScrollable: {
      overflowX: 'auto'
    },

    /* report table */
    reportTable: {
      tableLayout: 'initial'
    },
    stickyHeader: {
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0
    },
    cellWidthXXS: {
      width: '3vw'
    },
    cellWidthXS: {
      width: '5vw'
    },
    cellWidthSm: {
      width: '10vw'
    },
    cellWidthMd: {
      width: '15vw'
    },
    cellWidthLg: {
      width: '20vw'
    },
    cellWidthXL: {
      width: '25vw'
    },

    /* -------- generic classes end ----------*/

    /* ---------  Table  ----------*/

    /* Table */

    table: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },

    minTable: {
      minWidth: 700,
    },
    
    dialog: {
      width: '100%',
    },
    
    minTableDialog: {
      minWidth: 100
    },
    
    /* Table Action */
    tableReportAction: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
    },

    colorBlue: { color: blue['500'] },

    /* Paper paing */
    paperPaging: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }
  });

export default styles;