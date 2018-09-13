import { Divider, List, ListItem, ListItemText, ListSubheader, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { ConnectedReduxProps } from '../../../../generic/types';
import styles from '../../../../styles';
import { menuLinkMapper } from '../../../../utils';
import { ILookupRoleMenuList } from '../../../lookup/interfaces/ILookupRoleMenuList';
import { IAppUser, ICurrentPage } from '../../interfaces';
import { setActive, setMenuDrawer } from '../../store/actionCreators';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  menuDrawer: boolean;
  menuItems: ILookupRoleMenuList[];
  user: IAppUser;
  active: ICurrentPage;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setActive: typeof setActive;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const menuItemDrawer: React.StatelessComponent<AllProps> = props => (
  <div>
    {props.user && (
      <div className={props.classes.drawerHeader}>
        <List dense disablePadding>
          <ListItem>
            <ListItemText
              primary={props.user.company.name} 
              secondary={props.user.position.name} />
          </ListItem>
        </List>
      </div>
    )}
    <Divider />
    <List dense disablePadding
      component="nav" 
      subheader={
        <ListSubheader 
          component="div" 
          color="inherit">
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
              color="inherit"
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
                props.setActive({
                  menuUid: item.uid,
                  title: item.name,
                  subTitle: item.uid
                }) && 
                props.setMenuDrawer(!props.menuDrawer) &&
                props.history.push(menuLinkMapper(item.uid))}>
              <ListItemText 
                key={item.uid} 
                primary={item.name} 
                color={props.active.menuUid === item.uid ? 'primary' : 'inherit'} />
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