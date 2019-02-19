import { IAppBarControl, IAppBarMenu } from '@layout/interfaces';
import { AppBar, Badge, Button, IconButton, Menu, MenuItem, PropTypes, Toolbar, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { TopBarProps } from './TopBar';

interface MoreControlOptions {
  color: PropTypes.Color;
  isOpen: boolean;
  items: IAppBarMenu[] | undefined;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickItem: (item: IAppBarMenu) => void;
  onClose: () => void;
}

const MoreControl: React.SFC<MoreControlOptions> = props => (
  <React.Fragment>
    <IconButton
      id="appbar.btn.more"
      color={props.color}
      aria-label="More"
      onClick={props.onClick}
    >
      <MoreVertIcon />
    </IconButton>

    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById('appbar.btn.more')} 
      open={props.isOpen} 
      onClose={props.onClose}
    >
      {
        props.items && 
        props.items
          .filter(item => item.visible)
          .map(item =>
            <MenuItem 
              button
              key={item.id}
              value={item.id}
              disabled={!item.enabled}
              onClick={() => props.onClickItem(item)} 
            >
              {item.name}
            </MenuItem>  
          )
      }
    </Menu>
  </React.Fragment>
);

interface ToolbarControlOptions {
  color: PropTypes.Color;
  menuclassName: string;
  OnClickMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: string | undefined;
  titleClassName: string;
  showBack: boolean;
  OnClickBack: (event: React.MouseEvent<HTMLDivElement>) => void;
  showSearch: boolean;
  OnClickSearch: (event: React.MouseEvent<HTMLDivElement>) => void;
  showNotif: boolean;
  notifCount: number;
  OnClickNotif: (event: React.MouseEvent<HTMLDivElement>) => void;
  showMore: boolean;
  isOpenMore: boolean;
  customControls?: IAppBarControl[];
  moreItems?: IAppBarMenu[];
  onClickMore: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickMoreItem: (item: IAppBarMenu) => void;
  onCloseMore: () => void;
  searchComponent?: React.ReactNode;
  customComponent?: React.ReactNode;
}

const ToolbarControl: React.SFC<ToolbarControlOptions> = props => (
  <Toolbar>
    {
      /* menu */
      !props.showBack &&
      <IconButton
        color={props.color}
        aria-label="open drawer"
        onClick={props.OnClickMenu}
        className={props.menuclassName}
      >
        <MenuIcon />
      </IconButton>
    }

    {
      /* back */
      props.showBack &&
      <IconButton
        color={props.color}
        onClick={props.OnClickBack}
      >
        <ArrowBackIcon />
      </IconButton>
    }

    {/* title */}
    <Typography 
      noWrap 
      variant="h6" 
      color={props.color}
      className={props.titleClassName}
    >
      {props.title || ''}
    </Typography>

    {/* search */}
    {props.searchComponent}
    
    {
      /* notifications */
      props.showNotif &&
      props.notifCount > 0 &&
      <IconButton
        color={props.color}
        aria-label="Notifications"
        onClick={props.OnClickNotif}
      >
        <Badge badgeContent={props.notifCount} color="error">
          <NotificationImportant />
        </Badge>
      </IconButton>
    }

    {
      props.customControls &&
      props.customControls.map((control, index) =>
        <IconButton 
          key={index}
          color={props.color}
          disabled={control.disabled === true}
          onClick={control.onClick}
        >
          <control.icon/>
        </IconButton>
      )
    }

    {props.customComponent}

    {
      props.showMore &&
      <MoreControl 
        color={props.color}
        items={props.moreItems}
        isOpen={props.isOpenMore}
        onClick={props.onClickMore}
        onClickItem={props.onClickMoreItem}
        onClose={props.onCloseMore}
      />
    }
  </Toolbar>
);

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={1}
    position="fixed"
    className={classNames(props.classes.appBar, props.layoutState.anchor === 'right' ? props.classes.appBarShiftRight : props.classes.appBarShiftLeft)}
  >
      {
        props.mode === 'normal' &&
        <ToolbarControl
          color={isWidthUp('md', props.width) ? 'default' : 'inherit'}
          menuclassName={classNames(props.classes.navIconHide, props.isOpenMenu && props.classes.hide)}
          OnClickMenu={props.onClickMenu}
          title={props.layoutState.view && props.layoutState.view.title}
          titleClassName={props.classes.flex}
          showBack={props.layoutState.isNavBackVisible}
          OnClickBack={props.handleOnClickBack}
          showSearch={props.layoutState.isSearchVisible}
          OnClickSearch={props.handleOnClickSearch}
          showNotif={true}
          notifCount={props.getCountNotif()}
          OnClickNotif={props.onClickNotif}
          showMore={props.layoutState.isMoreVisible}
          customControls={props.appBarState.controls}
          moreItems={props.appBarState.menus}
          isOpenMore={props.isShowMenu}
          onClickMore={props.handleOnClickMore}
          onClickMoreItem={props.handleOnClickMoreItem}
          onCloseMore={props.handleOnCloseMore}
          searchComponent={props.appBarState.searchComponent}
          customComponent={props.appBarState.customComponent}
        />
      }

      {
        props.mode === 'selection' &&
        props.appBarState.selections &&
        <Toolbar>
          <IconButton
              aria-label="close selection"
              onClick={() => props.handleOnDiscardSelection()}
            >
              <ArrowBackIcon color="action" />
            </IconButton>

          <Typography 
            noWrap 
            variant="body2"
            className={props.classes.flex}
          >
            <FormattedMessage id="layout.label.selection" values={{count: props.appBarState.selections.length}} />
          </Typography>

          <Button 
            size="small"
            onClick={() => props.handleOnClickProcess()}
          >
            <FormattedMessage id="layout.action.process" />
          </Button>
        </Toolbar>
      }

  </AppBar>
);