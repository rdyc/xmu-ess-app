import { createStyles, Theme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const drawerWidth = 260;

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

    // Application Bar
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${0}px)`,
        marginLeft: 0,
        marginRight: 0,
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
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
      })
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
    avatarRed: {
      color: '#fff',
      backgroundColor: red[500],
      fontSize: theme.typography.fontSize / 1.1
    },
    flex: {
      flex: 1
    },

    // content
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing.unit * 10,
      },
      [theme.breakpoints.down('md')]: {
        padding: 0,
        marginTop: theme.spacing.unit * 8,
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
      height: `calc(100vh - 128px - 120px)`,
    },
    reportPaperPartial: {
      width: `calc(100vw - 32px - ${drawerWidth}px)`
    },
    reportPaperMobile: {
      overflowX: 'auto',
      height: `calc(100vh - 64px - 208px)`,
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
    }
  });

export default styles;