import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setAdditionalDrawer, setMenuDrawer, setSearchMode, setNavBack } from '@layout/store/actionCreators';
import { Anchor } from '@layout/types';
import { AppBar, Badge, IconButton, TextField, Toolbar, Typography, WithStyles, Slide } from '@material-ui/core';
import { isWidthUp, WithWidthProps } from '@material-ui/core/withWidth';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SearchIcon from '@material-ui/icons/Search';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  active: ICurrentPage;
  user: IAppUser;
  notification: number;
  searchMode: boolean;
  navBack: boolean;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setSearchMode: typeof setSearchMode;
  setNavBack: typeof setNavBack;
}

type AllProps = PropsFromState & PropsFromDispatch & WithWidthProps & ConnectedReduxProps;

const renderNormalMode = (props: AllProps) => (
  <Toolbar>
    {/* menu */}
    {!props.navBack &&
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => props.setMenuDrawer(!props.menuDrawer)}
        className={classNames(props.classes.navIconHide, props.menuDrawer && props.classes.hide)}>
        <MenuIcon />
      </IconButton>
    }

    {/* back */}
    {props.navBack && 
      <IconButton
        color="inherit"
        onClick={() => props.setNavBack(!props.navBack) && props.history.goBack()}
        className={classNames(props.classes.navIconHide, props.menuDrawer && props.classes.hide)}>
        <ArrowBackIcon />
      </IconButton>
    }

    {/* title */}
    <Typography 
      noWrap 
      variant="title" 
      color="inherit" 
      className={props.classes.flex}
    >
      {props.active && props.active.title}
    </Typography>

    {/* search */}
    <IconButton
      color="inherit"
      aria-label="More"
      onClick={() => props.setSearchMode(!props.searchMode)}
    >
      <SearchIcon />
    </IconButton>
    
    {/* notifications */}
    {props.notification > 0 &&
      <IconButton
        color="inherit"
        aria-label="Notifications"
        onClick={() => props.setAdditionalDrawer(!props.additionalDrawer)}
      >
        <Badge badgeContent={props.notification} color="error">
          <NotificationImportant />
        </Badge>
      </IconButton>
    }

    {/* more */}
    <IconButton
      color="inherit"
      aria-label="More"
      onClick={() => props.setAdditionalDrawer(!props.additionalDrawer)}
    >
      <MoreVertIcon />
    </IconButton>
  </Toolbar>
);

const renderSearchMode = (props: AllProps) => (
  <Slide 
    mountOnEnter 
    unmountOnExit
    direction="down" 
    in={props.searchMode} 
    timeout={300}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open search"
        onClick={() => props.setSearchMode(!props.searchMode)}
      >
        <ArrowBackIcon />
      </IconButton>
      <TextField 
        fullWidth
        autoFocus
        placeholder="type to search" 
      />
    </Toolbar>
  </Slide>
);

const findClasses = (props: AllProps) => {
  const shift = props.anchor === 'right' ? props.classes.appBarShiftRight : props.classes.appBarShiftLeft;

  return props.menuDrawer ? classNames(props.classes.appBar) : classNames(props.classes.appBar, shift);
};

export const topAppBar: React.StatelessComponent<AllProps> = props => (
  <AppBar 
    elevation={isWidthUp('md', props.width) ? 3 : 1}
    position="fixed"
    color={props.searchMode ? 'inherit' : 'primary'}
    className={findClasses(props)}
  >
    {props.searchMode ? renderSearchMode(props) : renderNormalMode(props)}
  </AppBar>
);