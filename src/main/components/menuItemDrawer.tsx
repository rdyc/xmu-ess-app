import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WithStyles, Divider, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { ConnectedReduxProps } from '../store';
import styles from '../styles';
import { LookupRoleMenuListType } from '../store/lookup/types/LookupRoleMenuListType';
import { setTitle, setMenuDrawer } from '../store/@layout';
import menuLinkMapper from '../utils/menuLinkMapper';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  menuDrawer: boolean;
  menuItems: LookupRoleMenuListType[];
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setTitle: typeof setTitle;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const menuItemDrawer: React.StatelessComponent<AllProps> = props => (
  <div>
    <div className={props.classes.drawerHeader} />
    <Divider />
    <List dense disablePadding
      component="nav" 
      subheader={
        <ListSubheader component="div">
          Home
        </ListSubheader>
      }>
      <ListItem button onClick={() => props.history.push('/home')}>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </List>
    {props.menuItems.map(header => (
      <div key={header.uid}>
        <List dense disablePadding 
          component="nav" 
          key={header.uid} 
          subheader={
            <ListSubheader 
              component="div"
              key={header.uid}
            >
              {header.name}
            </ListSubheader>
          }>
          {header.childs && header.childs.map(item => (
            <ListItem 
              key={item.uid} 
              button 
              onClick={() => 
                props.setTitle(item.name) && 
                props.setMenuDrawer(!props.menuDrawer) &&
                props.history.push(menuLinkMapper(item.uid))}>
              <ListItemText key={item.uid} primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    ))}
    <Divider />
    <List dense disablePadding
      component="nav">
      <ListItem button onClick={() => props.history.push('/help')}>
        <ListItemText primary="Help" />
      </ListItem>
    </List>
  </div>
);