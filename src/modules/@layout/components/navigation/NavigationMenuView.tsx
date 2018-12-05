import AppMenu from '@constants/AppMenu';
import { Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { Link } from 'react-router-dom';
import { NavigationMenuProps } from './NavigationMenu';

export const navigationMenu: React.SFC<NavigationMenuProps> = props => (
  <List 
    disablePadding 
    component="nav"
  >
    {
      props.userState.user &&
      <ListItem>
        <ListItemText
          primary={props.userState.user.company.name}
          secondary={props.userState.user.position.name}
          primaryTypographyProps={{
            variant: 'body1',
            color: 'inherit'
          }}
          secondaryTypographyProps={{
            color: 'inherit'
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
          variant: 'body1',
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
        onClick={() => props.handleOnClickMenuItem(AppMenu.Home, AppMenu.Dashboard)}
      >
        <ListItemText 
          className={props.classes.marginFarLeft}
          primary={'Dashboard'}
          primaryTypographyProps={{
            noWrap: true,
            variant: props.childUid === AppMenu.Dashboard ? 'body2' : 'body1',
            color: 'inherit'
          }}
        />
      </ListItem>
        <ListItem button color={'inherit'}>
          <Link to={'/reports/winningratio'}>
          <ListItemText 
            className={props.classes.marginFarLeft}
            primary={'Winning Ratio'}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'body1',
              color: 'inherit'
            }}
          />
          </Link>
      </ListItem>
    </Collapse>

    {
      props.userState.user &&
      props.userState.user.menus &&
      props.userState.user.menus.map(header => (
        <div key={header.uid}>
          <ListItem
            button
            color={'inherit'}
            onClick={() => props.handleOnClickMenuHeader(header.uid)}
          >
            <ListItemText 
              primary={header.name}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'body1',
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
                  onClick={() => props.handleOnClickMenuItem(header.uid, child.uid)}
                >
                  <ListItemText 
                    className={props.classes.marginFarLeft}
                    primary={child.name}
                    primaryTypographyProps={{
                      noWrap: true,
                      variant: props.childUid === child.uid ? 'body2' : 'body1',
                      color: 'inherit'
                    }}
                  />
                </ListItem>
              )
            }
            {/* <MenuList color="inherit">          
              {
                header.childs &&
                header.childs.map(child =>
                  <MenuItem 
                    color=""
                    key={child.uid} 
                    selected={props.childUid === child.uid}
                    onClick={() => props.handleOnClickMenuItem(header.uid, child.uid)}
                  >
                    <Typography
                      className={props.classes.marginFarLeft}
                      noWrap={true}
                      variant={'body1'} 
                      color={'textPrimary'}
                    >
                      {child.name}
                    </Typography>
                  </MenuItem>
                )
              }
            </MenuList> */}
          </Collapse>
        </div>
      ))
    }

    <Divider />
  </List>
);