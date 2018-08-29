import { Theme, createStyles } from '@material-ui/core';

const drawerWidth = 240;

const size = {
  thin: 2,
  wide: 3,
  far: 4
};

// const styles2 = (theme: Theme) => createStyles({
//     root: {
//         width: '100%',
//         height: '100%',
//         zIndex: 1,
//         overflow: 'hidden',
//     },
//     layout: {
//         width: 'auto',
//         marginLeft: theme.spacing.unit * 2,
//         marginRight: theme.spacing.unit * 2,
//         [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
//         width: 600,
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         },
//     },
//     paper: {
//         marginTop: theme.spacing.unit * 3,
//         marginBottom: theme.spacing.unit * 3,
//         padding: theme.spacing.unit * 2,
//         [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
//           marginTop: theme.spacing.unit * 6,
//           marginBottom: theme.spacing.unit * 6,
//           padding: theme.spacing.unit * 3,
//         },
//     },
//     appFrame: {
//         width: '100%',
//         height: '100%',
//     },
//     appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//         position: 'absolute'
//     },
//     appBarShift: {
//         zIndex: theme.zIndex.drawer + 1,
//         position: 'absolute',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: 0,
//             width: `calc(100% - ${0}px)`,
//         },
//         [theme.breakpoints.up('md')]: {
//             marginLeft: drawerWidth,
//             width: `calc(100% - ${drawerWidth}px)`,
//         }
//     },
//     appBarSpacer: theme.mixins.toolbar,
//     toolbarTitle: {
//         flex: 1,
//     },
//     navIconHide: {
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
//     drawerHeader: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//         height: '100%',
//         backgroundColor: theme.palette.background.default,
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         [theme.breakpoints.up('md')]: {
//             width: drawerWidth,
//             position: 'relative',
//         },
//     },
//     content: {
//         backgroundColor: theme.palette.background.default,
//         width: '100%',
//         height: 'calc(100% - 56px)',
//         marginTop: 56,
//         [theme.breakpoints.up('sm')]: {
//             height: 'calc(100% - 64px)',
//             marginTop: 64,
//         },
//     },
//     card: {
//         width: '100%',
//     },
//     title: {
//         marginBottom: 16,
//         fontSize: 14,
//     },
//     spacer: {
//         marginTop: theme.spacing.unit * 3,
//     },
//     formControl: {
//         margin: theme.spacing.unit * 3,
//     },
//     group: {
//         margin: `${theme.spacing.unit}px 0`,
//     },
// });

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 0,
      zIndex: 1,
      overflow: 'hidden'
    },
    appBar: {
      // position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: `calc(100% - ${0}px)`
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`
      },
      // zIndex: theme.zIndex.navDrawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: `calc(100% - ${0}px)`
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerWidth - 60,
        width: `calc(100% - ${65}px)`
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
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
    drawerPaperClose: {
      width: 60,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    flex: {
      flex: 1
    },
    content: {
      flexGrow: 1,
      padding: 24,
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
        marginTop: 64
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerWidth
      }
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

    /* -------- generic classes start----------*/
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
    paddingFarBottom: { paddingBottom: theme.spacing.unit * size.far }

    /* -------- generic classes end ----------*/
  });

export default styles;