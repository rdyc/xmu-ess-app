import { createStyles, Theme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Background1 from './image/background/1.jpg';
import Background2 from './image/background/2.jpg';
import AchievementIcon from './image/icons/achievement.png';
import EventIcon from './image/icons/event.png';
import NewsIcon from './image/icons/news.png';
import EquineLogo from './image/logo/etg.svg';
import TessaLogo from './image/logo/tessa.svg';
import Pattern2 from './image/pattern/pattern2.svg';

// import sidebar from './image/sidebar/satrio-tower.jpg';
const drawerWidth = 300;

const size = {
  thin: 1,
  wide: 2,
  far: 3
};

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      [theme.breakpoints.up('md')]: {
        '::-webkit-scrollbar': {
          width: 5
        },
        '::-webkit-scrollbar-track': {
          background: 'rgba(250, 250, 250, 0)'
        },
        '::-webkit-scrollbar-thumb': {
          background: theme.palette.grey[200]
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.grey[300]
        }
      }
    },

    root: {
      width: '100%',
      marginBottom: 0,
      overflow: 'hidden',
      zIndex: 1
    },

    landingPage: {
      backgroundColor: theme.palette.grey[800]
    },

    /* LOGOS */
    logoEquine: {
      height: 70,
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
      color: '#FFF',
      padding: theme.spacing.unit * 6
    },

    /* HERO */
    heroHeader: {
      backgroundColor: theme.palette.grey[800],
      display: 'flex',
      position: 'fixed',
      color: theme.palette.primary.contrastText,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      width: '100%',
      zIndex: 2,
      opacity: 0.5,
      alignItems: 'center'
    },
    heroUnit: {
      backgroundColor: '#333',
      backgroundImage: `linear-gradient(rgba(0,130,170,0), ${theme.palette.grey[800]}), url("${Background1}")`,
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
      padding: theme.spacing.unit * 2,
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

    /* PRELOADER */
    preloader: {
      display: 'flex',
      alignItems: 'center',
      height: 160
    },
    preloaderContent: {
      margin: 'auto',
      display: 'grid'
    },

    /* ACCESS */
    accessContainer: {
      backgroundColor: '#333',
      backgroundImage: `url("${Background2}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      overflow: 'hidden'
    },
    accessContent: {
      backgroundColor: lightBlue[500],
      color: '#FFF'
    },
    accessAvatar: {
      backgroundColor: theme.palette.common.white,
      color: lightBlue[500]
    },
    accessItem: {
      padding: 0,
      color: lightBlue[500]
    },

    // Corner Appbar
    cornerAppBar: {
      background: theme.palette.type === 'light' ? lightBlue[500] : theme.palette.grey[900],
      color: theme.palette.common.white,
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        width: `calc(100%)`
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    // Application Bar
    appBar: {
      background: theme.palette.type === 'light' ? lightBlue[500] : theme.palette.grey[900],
      color: theme.palette.common.white,
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarTitle: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    appBarDialog: {
      background: theme.palette.type === 'light' ? lightBlue[500] : theme.palette.grey[900],
      color: theme.palette.common.white,
      position: 'relative'
    },

    // SEARCH
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius + 10,
      backgroundColor: fade(theme.palette.common.white, 0.5),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.7),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      color: theme.palette.grey[900],
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchRoot: {
      color: theme.palette.common.white,
      width: '100%',
    },
    searchInput: {
      color: theme.palette.grey[900],
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 8,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 80,
        '&:focus': {
          width: 200,
        },
      },
    },
    searchRightIcon: {
      color: theme.palette.grey[900],
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
      overflow: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
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
      backgroundColor: theme.palette.background.paper,
      backgroundImage: `url(${Pattern2})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'inherit',
      color: theme.palette.text.primary
    },

    // avatar
    avatarPrimary: {
      color: '#fff',
      backgroundColor: lightBlue[500]
    },
    avatarSecondary: {
      color: '#fff',
      backgroundColor: orange[500]
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
        marginTop: theme.spacing.unit * 8.5,
      },
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        marginTop: theme.spacing.unit * 7,
      }
    },

    // shift corner
    shiftCorner: {
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing.unit * 8.5,
      },
      [theme.breakpoints.up('md')]: {
        width: `982px`,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      },
    },
    shift: {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.direction === 'ltr' ? drawerWidth : 0,
        marginRight: theme.direction === 'rtl' ? drawerWidth : 0
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

    /* Color page end */
    toolbar: {
      background: theme.palette.type === 'light' ? lightBlue[500] : theme.palette.grey[900],
      color: theme.palette.common.white
    },

    /* Toolbar Custom */
    toolbarCustom: {
      minHeight: 40,
      background: theme.palette.type === 'light' ? orange[500] : theme.palette.grey[900],
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 2
    },

    /* Stepper */
    stepper: {
      backgroundColor: theme.palette.background.paper,
      alignItems: 'center',
      overflow: 'hidden',
      display: 'flex',
      height: 500,
      [theme.breakpoints.down('sm')]: {
        height: 300,
      },
    },
    stepperImg: {
      height: '100%',
      margin: '0 auto'
    },

    expansionCheckbox: {
      height: 25, 
      width: 25,
      marginRight: theme.spacing.unit * 2
    },

    /* Expander */
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    /* grid card */
    gridCard: {
      minWidth: 350
    },

    /* forms */
    flexRow: {
      display: 'flex',
      flexWrap: 'wrap'
    },

    flexColumn: {
      padding: 0,
      [theme.breakpoints.up('xs')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        width: `calc(100% / 2)`,
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      },
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% / 3)`,
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      },
      [theme.breakpoints.up('xl')]: {
        width: `calc(100% / 4)`,
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      }
    },

    flex2Column: {
      padding: 0,
      [theme.breakpoints.up('xs')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        width: `calc(100% / 2)`,
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      },
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - (100% / 3))`,
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      },
      // [theme.breakpoints.up('xl')]: {
      //   width: `calc(100% / 2)`,
      //   padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
      // }
    },

    flexContent: {
      marginBottom: theme.spacing.unit * 2,
      verticalAlign: 'middle',
      width: '100%'
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

    /* background colors */
    backgroundColorPrimary: { 
      backgroundColor: lightBlue[500],
    },
    backgroundColorSecondary: { 
      backgroundColor: orange[500],
    },

    /* colors */
    colorPrimary: { 
      color: theme.palette.primary.main
    },
    colorSecondary: { 
      color: theme.palette.secondary.main
    },
    colorRed: { color: red['500'] },

    /* text */
    textStrikethrough : { textDecoration: 'line-through' },

    /* padding */
    ultraDense : {
      padding: '3px',
    },

    /* -------- generic classes end ----------*/

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

    /* ---------  Table  ----------*/

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
    cellWidthMdV2: {
      minWidth: `15vw`,
      maxWidth: `15vw`,
      [theme.breakpoints.up('md')]: {
        minWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.15)`,
        maxWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.15)`,
      },
    },
    cellWidthLg: {
      minWidth: `25vw`,
      maxWidth: `25vw`,
      [theme.breakpoints.up('md')]: {
        minWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.25)`,
        maxWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.25)`,
      },
    },
    cellWidthXL: {
      width: '25vw'
    },
    cellWidthXXL: {
      width: '30vw'
    },
    cellWidthXXXL: {
      minWidth: `45vw`,
      maxWidth: `45vw`,
      [theme.breakpoints.up('md')]: {
        minWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.45)`,
        maxWidth: `calc((100vw - ${drawerWidth}px - 48px) * 0.45)`,
      },
    },

    /* Table */

    rootTable: {
      width: '100%',
      overflowX: 'auto',
    },

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
    },

    /* Chart */
    chartCard: {
      // height: '80%'
    },

    chartHeader: {
      maxHeight: 100
    },

    chartContent: {
      marginTop: theme.spacing.unit * -18,
      marginBottom: theme.spacing.unit * -8,
      marginRight: theme.spacing.unit * -17,
      marginLeft: theme.spacing.unit * -7
    },

    chartContentXS: {
      marginTop: theme.spacing.unit * -10
    },

    /* Upload Image */
    imageSize: {
      width: 500,
      height: 450
    },

    /* MUI Virtualize Table */
    virtualizedTable: {
      fontFamily: theme.typography.fontFamily,
    },
    virtualizedFlexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    virtualizedTableRow: {
      
    },
    virtualizedTableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    virtualizedTableCell: {
      flex: 1,
    },
    virtualizedNoClick: {
      cursor: 'initial',
    },

    /* Is Tr holiday */
    isTrHolidayBackground: {
      background: '#f44336'
    },
    colorWhite: {
      color: '#fff'
    },

    // chart resource mapping
    amChart: {
      width: '100%',
      fontFamily: theme.typography.fontFamily,
      textTransform: 'capitalize'
      // color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
    },

    hrTable: {
      height: '75vh',
      overflowX: 'auto',
      overflowY: 'auto'
    },

    hrTableTitle: {
      textAlign: 'center',
      padding: '10px'
    },

    hrTableVerAlign: {
      verticalAlign: 'top',
      padding: 0
    },

    hrTableChild: {
      paddingLeft: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit
    },

    hrTableResponder: {
      maxWidth: '100px',
      maxHeight: '10px',
      padding: '5px',
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0,
      overflow: 'hidden'
    },

    writingVertical: {
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)'
    },

    globalFont: {
      fontFamily: theme.typography.fontFamily
    },

    contentHover: {
      cursor: 'pointer',
      transition: 'all .3s',
      '&:hover': {
        backgroundColor: '#ebebeb',
      },
    },

    buttonActive: {
      backgroundColor: '#ebebeb',
    },
    
    buttonHover: {
      transition: 'all .3s',
      '&:hover': {
        transform: 'scale(1.03)'
      },
    },

    titleTopBarCorner: {
      padding: '0',
      transition: 'all .3s',
      '&:hover': {
        transform: 'scale(1.03)'
      },
    },

    textWithStrikeLine: {
      display: 'grid',
      gridTemplateColumns: '1fr max-content 1fr',
      gridColumnGap: '1.5rem',
      alignItems: 'center',

      '&::after, &::before' : {
        content: `''`,  
        height: '1px',
        display: 'block',
        backgroundColor: 'currentColor'
      }
    },

    textDecorationNone: {
      '& a' : {
        textDecoration: 'none',
      }
    },
    
    contentCenter: {
      position: 'absolute',
      left: '50%',
      transform: ''
    },

    // this is for elipsis on 2nd / .. lane *depneds on line clamp
    textElipsis2ndLine: {
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2'
    },

    // this is for elipsis on 1st line
    textElipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    breadcrumb: {
      // background: '#ebebeb', 
      // borderRadius: '5px',
      textTransform: 'capitalize',
      display: 'inline',
    },

    breadcrumbLink: {
      textDecoration: 'none',
      '& p': {
        '&:hover': {
          color: lightBlue[500]
        },
      },
    },

    breadcrumbChild: {
      // textTransform: 'capitalize',
      // display: 'inline',
      // verticalAlign: 'middle',
      marginLeft: '4px'
    },

    badgeParent: {
      padding: '0 16px',
      display: 'inline-flex',
      position: 'relative',
      verticalAlign: 'middle'
    },

    badgeChild: {
      color: '#fff',
      backgroundColor: orange[500],

      top: 0,
      right: 0,
      height: '20px',
      display: 'flex',
      padding: '0 4px',
      zIndex: 1,
      position: 'absolute',
      flexWrap: 'wrap',
      minWidth: '20px',
      transform: 'translate(20px, -50%)',
      boxSizing: 'border-box',
      transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      alignContent: 'center',
      borderRadius: '10px',
      flexDirection: 'row',
      justifyContent: 'center',
      transformOrigin: '100% 0%'
    },

    dialogTitle: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    dialogClose: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
    dialogContent: {
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    dialogActions: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },

    globalSize: {
      fontSize: theme.typography.fontSize
    },

    movingText: {
      overflow: 'hidden',
      padding: '0',
      '& span': {
        // overflow: 'visible',
        display: 'inline-flex',
        '&:hover': {
          position: 'relative',
          animation: 'moveTextHorz 3s linear infinite'
        },
      }
    },

    '@keyframes moveTextHorz': {
      '0%': {
        transform: 'translate(0, 0)'
      },
      '100%': {
        transform: 'translate(-70%, 0)'
      }
    },

    textError: {
      '& span': {
        color: red[500]
      }
    },

    mappedItem: {
      width: '50px',

      [theme.breakpoints.up('sm')]: {
        right: '90px',
      },
      [theme.breakpoints.up('md')]: {
        right: '15px',
      }
    },

    tableCategory: {
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.type === 'light' ? lightBlue[700] : theme.palette.grey[600],
      }
    },

    expandCategory: {
      verticalAlign: 'middle',
      marginLeft: '10px'
    },
  });

export default styles;