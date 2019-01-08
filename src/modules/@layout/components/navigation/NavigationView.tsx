import AppMenu from '@constants/AppMenu';
import { Collapse, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { ModuleIcon } from '../moduleIcon/ModuleIcon';
import { NavigationProps } from './Navigation';
import { NavigationHeader } from './NavigationHeader';

export const NavigationView: React.SFC<NavigationProps> = props => (
  <List disablePadding component="nav">
    <NavigationHeader 
      headerUid={props.headerUid} 
      onClickHeader={() => props.handleOnClickMenuHeader(AppMenu.User)} 
    />
    
    <ListItem 
      button
      onClick={() => props.handleOnClickMenuHeader(AppMenu.Home)}
    >
      <ListItemIcon className={props.classes.drawerPaperMenuItem}>
        <ModuleIcon module={AppMenu.Home}  />
      </ListItemIcon>
      <ListItemText 
        primary="Home" 
        primaryTypographyProps={{
          variant: 'body2',
          color: 'inherit'
        }}
      />
      <ListItemSecondaryAction>
        {props.headerUid === AppMenu.Home ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
      </ListItemSecondaryAction>
    </ListItem>

    <Collapse in={props.headerUid === AppMenu.Home}>
      <ListItem
        button
        color={'inherit'}
        selected={props.childUid === AppMenu.Dashboard}
        onClick={() => props.handleOnClickMenuItem(AppMenu.Home, AppMenu.Dashboard)}
      >
        <ListItemText 
          className={props.classes.drawerPaperMenuItemSub}
          primary={'Dashboard'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
            color: 'inherit'
          }}
        />
      </ListItem>
    </Collapse>

    {
      props.userState.user &&
      props.userState.user.menus &&
      props.userState.user.menus.map(header => (
        <React.Fragment key={header.uid}>
          <ListItem
            button
            color="inherit"
            onClick={() => props.handleOnClickMenuHeader(header.uid)}
          >
            <ListItemIcon className={props.classes.drawerPaperMenuItem}>
              <ModuleIcon module={header.uid}  />
            </ListItemIcon>
            <ListItemText 
              primary={header.name}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'body2',
                color: 'inherit'
              }}
            />
            <ListItemSecondaryAction>
              {props.headerUid === header.uid ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
            </ListItemSecondaryAction>
          </ListItem>
          
          <Collapse in={props.headerUid === header.uid}>
            {
              header.childs &&
              header.childs.map(child =>
                <ListItem 
                  key={child.uid}
                  button
                  color={'inherit'}
                  selected={props.childUid === child.uid}
                  onClick={() => props.handleOnClickMenuItem(header.uid, child.uid)}
                >
                  <ListItemText
                    className={props.classes.drawerPaperMenuItemSub}
                    primary={child.name}
                    primaryTypographyProps={{
                      noWrap: true,
                      variant: 'body2',
                      color: 'inherit'
                    }}
                  />
                </ListItem>
              )
            }
          </Collapse>
        </React.Fragment>
      ))
    }

    <ListItem>
      <ListItemText
        className={props.classes.drawerPaperFooter}
        primary={process.env.REACT_APP_WEBSITE_NAME}
        secondary={process.env.REACT_APP_WEBSITE_FOOTER}
        primaryTypographyProps={{
          align: 'center',
          noWrap: true,
          variant: 'caption',
          color: 'inherit'
        }}
        secondaryTypographyProps={{
          noWrap: true,
          align: 'center',
          variant: 'caption',
          color: 'inherit'
        }}
      />
    </ListItem>
  </List>
);