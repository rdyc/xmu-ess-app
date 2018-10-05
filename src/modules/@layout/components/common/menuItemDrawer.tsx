import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState } from '@layout/interfaces';
import { layoutChangeView, layoutDrawerMenuHide, layoutDrawerMenuShow } from '@layout/store/actions';
import { ILookupRoleMenuChildList } from '@lookup/classes';
import { Divider, List, ListItem, ListItemText, ListSubheader, WithStyles } from '@material-ui/core';
import { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { menuLinkMapper } from '@utils/index';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    drawerMenuShow: typeof layoutDrawerMenuShow;
    drawerMenuHide: typeof layoutDrawerMenuHide;
    changeView: typeof layoutChangeView;
  };
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                WithWidth & 
                WithStyles<typeof styles>;

export const menuItemDrawer: React.StatelessComponent<AllProps> = props => {
  const { layoutState, layoutDispatch, classes, history } = props;

  const handleClick = (item: ILookupRoleMenuChildList) => {
    layoutDispatch.changeView({
      menuUid: item.uid,
      title: item.name,
      subTitle: item.uid
    });

    if (layoutState.isDrawerMenuVisible && !isWidthUp('md', props.width)) {
      layoutDispatch.drawerMenuHide();
    }
    
    history.push(menuLinkMapper(item.uid));
  };

  return (
    <div>
      {layoutState.user && (
        <div className={classes.drawerHeader}>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary={layoutState.user.company.name} 
                secondary={layoutState.user.position.name} />
            </ListItem>
          </List>
        </div>
      )}
      <Divider />
      <List disablePadding
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
      {layoutState.menus.map(header => (
        <div key={header.uid}>
          <List disablePadding 
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
                button
                key={item.uid} 
                color="secondary"
                onClick={() => handleClick(item)}
              >
                <ListItemText 
                  key={item.uid} 
                  primary={item.name} 
                  color={layoutState.view && layoutState.view.menuUid === item.uid ? 'primary' : 'secondary'} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
      <Divider />
      <List disablePadding
        component="nav">
        <ListItem button onClick={() => history.push('/help')}>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  );
};