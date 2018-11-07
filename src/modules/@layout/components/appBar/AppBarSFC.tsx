import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withNotification, WithNotification } from '@layout/hoc/withNotification';
import { IAppBarMenu } from '@layout/interfaces';
import { AppBar, Badge, IconButton, Input, Menu, MenuItem, Slide, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import AppsIcon from '@material-ui/icons/Apps';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SearchIcon from '@material-ui/icons/Search';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps 
  = WithAppBar
  & WithLayout
  & WithNotification
  & WithWidth 
  & WithStyles<typeof styles>
  & RouteComponentProps;

const AppBarSFC: React.SFC<AllProps> = props => {
  const { layoutState, notificationState, appBarState, layoutDispatch, appBarDispatch, classes, history, width }  = props;

  const fnCountNotif = () =>  {
    let count: number = 0;
    
    if (notificationState.result && notificationState.result.data) {
      if (isArray(notificationState.result.data)) {
          notificationState.result.data.forEach(element =>
            element.details.forEach(detail => {
              count = count + detail.total;
            })
        );
      }
    }

    return count;
  };

  const notifCount = fnCountNotif();

  const fnFindClasses = () => {
    const shift = layoutState.anchor === 'right' ? classes.appBarShiftRight : classes.appBarShiftLeft;
  
    return layoutState.isDrawerMenuVisible ? classNames(classes.appBar) : classNames(classes.appBar, shift);
  };

  const handleClose = () => {
    appBarDispatch.menuHide();
  };

  const handleClick = (item: IAppBarMenu) => {
    appBarDispatch.menuHide();
    appBarState.callback(item);
  };

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
        >
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
        notifCount > 0 &&
        <IconButton
          color="inherit"
          aria-label="Notifications"
          onClick={() => layoutDispatch.drawerActionShow()}
        >
          <Badge badgeContent={notifCount} color="error">
            <NotificationImportant />
          </Badge>
        </IconButton>
      }

      {
        /* action */
        layoutState.isActionCentreVisible &&
        <IconButton
          color="inherit"
          aria-label="Action"
          onClick={() => layoutDispatch.drawerActionShow()}
        >
          <AppsIcon />
        </IconButton>
      }
  
      {
        /* more */
        layoutState.isMoreVisible &&
        <IconButton
          id="appbar.btn.more"
          color="inherit"
          aria-label="More"
          onClick={() => appBarDispatch.menuShow()}
          >
          <MoreVertIcon />
        </IconButton>
      }
    </Toolbar>
  );

  const renderMenuItems = (menus: IAppBarMenu[]) => (
    menus
      .filter(item => item.visible)
      .map(item =>
        <MenuItem 
          button
          key={item.id}
          value={item.id}
          disabled={!item.enabled}
          onClick={() => handleClick(item)} 
        >
          {item.name}
        </MenuItem>  
      )
  );

  const renderMenu = (
    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById('appbar.btn.more')} 
      // PaperProps={{
      //   style: {
      //     maxHeight: ITEM_HEIGHT * 4.5,
      //     width: 200,
      //   },
      // }}
      open={appBarState.menuIsOpen} 
      onClose={() => handleClose()}
    >
      {
        appBarState.menus && 
        renderMenuItems(appBarState.menus)
      }
    </Menu>
  );
  
  return (
    <AppBar 
      elevation={isWidthUp('md', width) ? 3 : 1}
      position="fixed"
      color={layoutState.isModeSearch ? 'inherit' : layoutState.theme.palette.type === 'dark' ? 'inherit' : 'primary'}
      className={fnFindClasses()}
    >
      {
        layoutState.isModeSearch ? renderSearchMode : renderNormalMode
      }
      {renderMenu}
    </AppBar>
  );
};

export default compose(
  setDisplayName('AppBarSFC'),
  withLayout,
  withNotification,
  withAppBar,
  withRouter,
  withStyles(styles)
)(AppBarSFC);