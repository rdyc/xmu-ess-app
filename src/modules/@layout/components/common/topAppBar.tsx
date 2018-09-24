import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState } from '@layout/interfaces';
import {
  layoutDrawerActionHide,
  layoutDrawerActionShow,
  layoutDrawerMenuHide,
  layoutDrawerMenuShow,
  layoutModeSearchOff,
  layoutModeSearchOn,
  layoutNavBackHide,
  layoutNavBackShow,
} from '@layout/store/actions';
import { AppBar, Badge, IconButton, Input, Slide, Toolbar, Typography, WithStyles } from '@material-ui/core';
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
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    drawerMenuShow: typeof layoutDrawerMenuShow;
    drawerMenuHide: typeof layoutDrawerMenuHide;
    drawerActionShow: typeof layoutDrawerActionShow;
    drawerActionHide: typeof layoutDrawerActionHide;
    modeSearchOn: typeof layoutModeSearchOn;
    modeSearchOff: typeof layoutModeSearchOff;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
  };
}

type AllProps = PropsFromState & PropsFromDispatch & WithWidthProps & ConnectedReduxProps;

export const topAppBar: React.StatelessComponent<AllProps> = props => {
  const { layoutState, layoutDispatch, classes, history, width }  = props;

  const renderSearchMode = (
    <Slide 
      mountOnEnter 
      unmountOnExit
      direction="down" 
      in={layoutState.isModeSearch} 
      timeout={300}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="close search"
          onClick={() => layoutDispatch.modeSearchOff()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Input 
          fullWidth
          autoFocus
          disableUnderline
          placeholder="Search" 
        />
      </Toolbar>
    </Slide>
  );

  const renderNormalMode = (
    <Toolbar>
      {
        /* menu */
        !layoutState.isNavBackVisible &&
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => layoutDispatch.drawerMenuShow()}
          className={classNames(classes.navIconHide, layoutState.isDrawerMenuVisible && classes.hide)}>
          <MenuIcon />
        </IconButton>
      }
  
      {
        /* back */
        layoutState.isNavBackVisible && 
        <IconButton
          color="inherit"
          onClick={() => layoutDispatch.navBackShow() && history.goBack()}
          className={classNames(classes.navIconHide, layoutState.isDrawerMenuVisible && classes.hide)}>
          <ArrowBackIcon />
        </IconButton>
      }
  
      {/* title */}
      <Typography 
        noWrap 
        variant="title" 
        color="inherit" 
        className={classes.flex}
      >
        {layoutState.view && layoutState.view.title}
      </Typography>
  
      {/* search */}
      {
        layoutState.isSearchVisible &&
        <IconButton
          color="inherit"
          aria-label="Search"
          onClick={() => layoutDispatch.modeSearchOn()}
        >
          <SearchIcon />
        </IconButton>
      }
      
      {
        /* notifications */
        layoutState.notifCount > 0 &&
        <IconButton
          color="inherit"
          aria-label="Notifications"
          onClick={() => layoutDispatch.drawerActionShow()}
        >
          <Badge badgeContent={layoutState.notifCount} color="error">
            <NotificationImportant />
          </Badge>
        </IconButton>
      }
  
      {/* more */}
      <IconButton
        color="inherit"
        aria-label="More"
        onClick={() => layoutDispatch.drawerActionShow()}
      >
        <MoreVertIcon />
      </IconButton>
    </Toolbar>
  );

  const fnFindClasses = () => {
    const shift = layoutState.anchor === 'right' ? classes.appBarShiftRight : classes.appBarShiftLeft;
  
    return layoutState.isDrawerMenuVisible ? classNames(classes.appBar) : classNames(classes.appBar, shift);
  };
  
  return (
    <AppBar 
      elevation={isWidthUp('md', width) ? 3 : 1}
      position="fixed"
      color={layoutState.isModeSearch ? 'inherit' : 'primary'}
      className={fnFindClasses()}
    >
      {
        layoutState.isModeSearch ? renderSearchMode : renderNormalMode
      }
    </AppBar>
  );
};