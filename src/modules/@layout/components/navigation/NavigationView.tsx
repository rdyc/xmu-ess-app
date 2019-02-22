import AppMenu from '@constants/AppMenu';
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as classNames from 'classnames';
import * as React from 'react';

import { ModuleIcon } from '../moduleIcon/ModuleIcon';
import { NavigationProps } from './Navigation';
import { NavigationHeader } from './NavigationHeader';

export const NavigationView: React.SFC<NavigationProps> = props => (
  <React.Fragment>
    <NavigationHeader 
      headerUid={props.headerUid} 
      onClickHeader={() => props.handleOnClickMenuHeader(AppMenu.User)} 
    />

    <List 
      disablePadding 
      component="nav" 
      style={{overflowX: 'auto'}}
    >
      <ListItem 
        button
        selected={props.childUid === AppMenu.Dashboard}
        onClick={() => props.handleOnClickMenuItem(AppMenu.Home, AppMenu.Dashboard, !isWidthUp('md', props.width))}
      >
        <ListItemIcon className={props.classes.drawerPaperMenuItem}>
          <ModuleIcon module={AppMenu.Home} innerProps={{ color: 'action' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Dashboard" 
          primaryTypographyProps={{
            variant: 'body2'
          }}
        />
      </ListItem>

      {
        props.userState.user &&
        props.userState.user.menus &&
        props.userState.user.menus.map(header => (
          <React.Fragment key={header.uid}>
            <ListItem
              button
              onClick={() => props.handleOnClickMenuHeader(header.uid)}
            >
              <ListItemIcon className={props.classes.drawerPaperMenuItem}>
                <ModuleIcon module={header.uid} innerProps={{ color: 'action' }} />
              </ListItemIcon>
              <ListItemText 
                primary={header.name}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: 'body2'
                }}
              />
              <ListItemSecondaryAction>
                <ExpandMore 
                  color="action" 
                  className={classNames(props.classes.expand, props.headerUid === header.uid ? props.classes.expandOpen : '')} 
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Collapse in={props.headerUid === header.uid}>
              {
                header.childs &&
                header.childs.map(child =>
                  <ListItem 
                    key={child.uid}
                    button
                    selected={props.childUid === child.uid}
                    onClick={() => props.handleOnClickMenuItem(header.uid, child.uid, !isWidthUp('md', props.width))}
                  >
                    <ListItemText
                      className={props.classes.drawerPaperMenuItemSub}
                      primary={child.name}
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: 'body2'
                      }}
                    />
                  </ListItem>
                )
              }
            </Collapse>
          </React.Fragment>
        ))
      }

      <Divider/>

      <ListItem>
        <ListItemText
          className={props.classes.drawerPaperFooter}
          primary={process.env.REACT_APP_WEBSITE_NAME}
          secondary={process.env.REACT_APP_WEBSITE_FOOTER}
          primaryTypographyProps={{
            align: 'center',
            noWrap: true,
            variant: 'caption',
          }}
          secondaryTypographyProps={{
            noWrap: true,
            align: 'center',
            variant: 'caption',
          }}
        />
      </ListItem>
    </List>
  </React.Fragment>
);