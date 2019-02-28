import { AppBar, Badge, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import * as React from 'react';

import { TopBarProps } from './TopBar';

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={0}
    color="default"
    position="fixed"
    className={props.classes.appBar}
  >
    <Toolbar>
      <IconButton
        className={(isWidthUp('md', props.width) || props.parentUrl) && props.classes.hide || ''}
        onClick={props.handleOnClickMenu}
      >
        <MenuIcon />
      </IconButton>

      <IconButton
        className={!props.parentUrl && props.classes.hide || ''}
        onClick={props.handleOnClickBack}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography 
        noWrap
        variant="h6"
        className={props.classes.flex}
      >
        {props.title}
      </Typography>

      {props.searchComponent}
      
      <IconButton
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