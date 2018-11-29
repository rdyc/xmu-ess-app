import AppMenu from '@constants/AppMenu';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { NavigationMenuProps } from './NavigationMenu';

export const navigationMenu: React.SFC<NavigationMenuProps> = props => (
  <List 
    disablePadding 
    component="div"
  >
    {
      props.userState.user &&
      <ListItem>
        <ListItemText
          primary={props.userState.user.company.name}
          secondary={props.userState.user.position.name}
          primaryTypographyProps={{
            variant: 'body1'
          }}
        />
      </ListItem>
    }

    <Divider />
    
    <ListItem 
      button
      onClick={() => props.handleOnClickMenuHeader(AppMenu.Home)}
    >
      <ListItemText 
        primary="Home" 
        primaryTypographyProps={{
          variant: 'body1'
        }}
      />
      <ListItemSecondaryAction>
        {props.headerUid === AppMenu.Home ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
      </ListItemSecondaryAction>
    </ListItem>

    <Collapse in={props.headerUid === AppMenu.Home}>
      <MenuList>
        <MenuItem
          selected={props.childUid === AppMenu.Dashboard}
          onClick={() => props.handleOnClickMenuItem(AppMenu.Home, AppMenu.Dashboard)}
        >
          <Typography
            className={props.classes.marginFarLeft}
            noWrap={true}
            variant={'body1'}
          >
            {'Dashboard'}
          </Typography>
        </MenuItem>
      </MenuList>
    </Collapse>

    {
      props.userState.user &&
      props.userState.user.menus &&
      props.userState.user.menus.map(header => (
        <div key={header.uid}>
          <ListItem
            button
            onClick={() => props.handleOnClickMenuHeader(header.uid)}
          >
            <ListItemText 
              primary={header.name}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'body1'
              }}
            />
            <ListItemSecondaryAction>
              {props.headerUid === header.uid ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
            </ListItemSecondaryAction>
          </ListItem>
          
          <Collapse in={props.headerUid === header.uid}>
            <MenuList>          
              {
                header.childs &&
                header.childs.map(child =>
                  <MenuItem 
                    key={child.uid} 
                    selected={props.childUid === child.uid}
                    onClick={() => props.handleOnClickMenuItem(header.uid, child.uid)}
                  >
                    <Typography
                      className={props.classes.marginFarLeft}
                      noWrap={true}
                      variant={'body1'}
                    >
                      {child.name}
                    </Typography>
                  </MenuItem>
                )
              }
            </MenuList>
          </Collapse>
        </div>
      ))
    }

    <Divider />

    <ListItem button>
      <ListItemText primary="Help" />
    </ListItem>
  </List>
);