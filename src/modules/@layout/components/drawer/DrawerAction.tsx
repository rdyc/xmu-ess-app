import NotificationListSFC from '@layout/components/notification/NotificationListSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import InvertColors from '@material-ui/icons/InvertColors';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, setDisplayName } from 'recompose';

type AllProps 
  = WithLayout 
  & WithUser
  & WithStyles<typeof styles>;

const DrawerActionView: React.SFC<AllProps> = props => (
  <SwipeableDrawer
    variant="temporary"
    anchor={props.layoutState.anchor === 'left' ? 'right' : 'left'}
    classes={{
      paper: classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)
    }}
    open={props.layoutState.isDrawerActionVisible}
    onOpen={() => props.layoutDispatch.drawerActionShow()}
    onClose={() => props.layoutDispatch.drawerActionHide()}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
  >
    <NotificationListSFC />

    <List 
      disablePadding
      subheader={
      <ListSubheader>
        <FormattedMessage id="global.setting.title"/>
      </ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <InvertColors />
        </ListItemIcon>
        <ListItemText 
          primary="Dark mode"
          primaryTypographyProps={{
            variant: 'body2'
          }}
        />
        <ListItemSecondaryAction>
          <Switch color="secondary"
            onChange={() => props.layoutDispatch.themeChange()}
            checked={props.layoutState.theme.palette ? props.layoutState.theme.palette.type === 'dark' : false}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <SwapHoriz />
        </ListItemIcon>
        <ListItemText 
          primary="Right hand"
          primaryTypographyProps={{
            variant: 'body2'
          }}
        />
        <ListItemSecondaryAction>
          <Switch color="secondary"
            onChange={() => props.layoutDispatch.changeAnchor(props.layoutState.anchor === 'right' ? 'left' : 'right')}
            checked={props.layoutState.anchor === 'right'}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </SwipeableDrawer>
);

export const DrawerAction = compose<AllProps, {}>(
  setDisplayName('DrawerAction'),
  withUser,
  withLayout,
  withStyles(styles)
)(DrawerActionView);