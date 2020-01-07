import { AppBar, Badge, Divider, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Book from '@material-ui/icons/Book';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import * as classNames from 'classnames';
import * as React from 'react';
import logoHrCorner from './hr_corner.png';

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
      
      <Tooltip title={'Go to HR Corner'}>
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/corner/blog')}
        >
          {/* <Book /> */}
          <img src={logoHrCorner} alt="Logo" style={{width: '32px', height: '32px'}} />
        </IconButton>
      </Tooltip>

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