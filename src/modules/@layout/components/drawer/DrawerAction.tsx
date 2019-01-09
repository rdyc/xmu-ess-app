import NotificationListSFC from '@layout/components/notification/NotificationListSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { SwipeableDrawer, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

type AllProps 
  = WithLayout 
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
  </SwipeableDrawer>
);

export const DrawerAction = compose<AllProps, {}>(
  setDisplayName('DrawerAction'),
  withLayout,
  withStyles(styles)
)(DrawerActionView);