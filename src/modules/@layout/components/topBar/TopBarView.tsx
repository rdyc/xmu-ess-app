import { AppBar, Badge, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import * as classNames from 'classnames';
import * as React from 'react';

import { TopBarProps } from './TopBar';

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={0}
    color="default"
    position="fixed"
    className={classNames(props.classes.appBar, props.classes.shift)}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        className={(isWidthUp('md', props.width) || props.parentUrl) && props.classes.hide || ''}
        onClick={props.handleOnClickMenu}
      >
        <MenuIcon />
      </IconButton>

      <IconButton
        color="inherit"
        className={!props.parentUrl && props.classes.hide || ''}
        onClick={props.handleOnClickBack}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography 
        noWrap
        color="inherit"
        variant="h6"
        className={props.classes.flex}
      >
        {props.title}
      </Typography>

      {props.searchComponent}
      
      <IconButton
        color="inherit"
        className={props.totalNotif === 0 && props.classes.hide || ''}
        onClick={props.handleOnClickNotif}
      >
        <Badge badgeContent={props.totalNotif} color="error">
          <NotificationImportant />
        </Badge>
      </IconButton>

      {props.customComponent}
    </Toolbar>
    
    <Divider/>
  </AppBar>
);