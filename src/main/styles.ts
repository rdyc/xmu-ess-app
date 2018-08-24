import { Theme, createStyles } from '@material-ui/core';

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
    },
    appFrame: {
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute'
    },
    appBarShift: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
            width: `calc(100% - ${0}px)`,
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    toolbarTitle: {
        flex: 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    card: {
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    spacer: {
        marginTop: theme.spacing.unit * 3,
    }
});

export default styles;