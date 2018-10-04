import { ConnectedReduxProps } from '@generic/types';
import Notifications from '@layout/components/common/notifications';
import { ILayoutState } from '@layout/interfaces';
import {
  layoutAccountColapse,
  layoutAccountExpand,
  layoutChangeAnchor,
  layoutChangeView,
  layoutDrawerActionHide,
  layoutDrawerActionShow,
  layoutLogoutDialogHide,
  layoutLogoutDialogShow,
} from '@layout/store/actions';
import {
  Avatar,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  WithStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SwapHorizontalCircle from '@material-ui/icons/SwapHorizontalCircle';
import WifiIcon from '@material-ui/icons/Wifi';
import styles from '@styles';
import { AppUserManager } from '@utils/userManager';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import * as store from 'store';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeAnchor: typeof layoutChangeAnchor;
    changeView: typeof layoutChangeView;
    drawerActionShow: typeof layoutDrawerActionShow;
    drawerActionHide: typeof layoutDrawerActionHide;
    accountExpand: typeof layoutAccountExpand;
    accountColapse: typeof layoutAccountColapse;
    logoutDialogShow: typeof layoutLogoutDialogShow;
    logoutDialogHide: typeof layoutLogoutDialogHide;
  };
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;

export const actionDrawer: React.SFC<AllProps> = props => {
  const { layoutState, layoutDispatch, history } = props;

  const handleLogout = () => {
    layoutDispatch.drawerActionHide();

    layoutDispatch.logoutDialogShow();
  };

  const handleClose = (confirm: boolean) => {
    layoutDispatch.logoutDialogHide();

    if (confirm) {
      store.clearAll();
      AppUserManager.signoutRedirect();
    }
  };

  const logoutDialog = (
    <Dialog
      open={layoutState.isLogoutDialogVisible}
      onClose={() => handleClose(false)}
      aria-labelledby="logout-dialog-title"
    >
      <DialogTitle id="logout-dialog-title">{'Are you sure want to logout?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      {logoutDialog}
      <SwipeableDrawer
        variant="temporary"
        anchor={layoutState.anchor === 'left' ? 'right' : 'left'}
        classes={{
          paper: classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)
        }}
        open={layoutState.isDrawerActionVisible}
        onOpen={() => layoutDispatch.drawerActionShow()}
        onClose={() => layoutDispatch.drawerActionHide()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        {layoutState.user && (
          <div>
            <List>
              <ListItem 
                button
                onClick={() => layoutState.isAccountExpanded ? layoutDispatch.accountColapse() : layoutDispatch.accountExpand()}>
                <Avatar className={props.classes.avatarRed}>
                  {layoutState.user.company.code}
                </Avatar>
                <ListItemText 
                  primary={layoutState.user.fullName} 
                  secondary={layoutState.user.email} />
                <ListItemSecondaryAction>
                  {layoutState.isAccountExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={layoutState.isAccountExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={() => history.push('/account/profile')}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText inset primary={<FormattedMessage id="global.profile.my.title"/>} />
                  </ListItem>
                  <ListItem button onClick={() => history.push('/')}>
                    <ListItemIcon>
                      <SwapHorizontalCircle />
                    </ListItemIcon>
                    <ListItemText inset primary={<FormattedMessage id="global.access.switch.title"/>} />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <PowerSettingsNew /> 
                    </ListItemIcon>
                    <ListItemText inset primary={<FormattedMessage id="global.logout.title"/>}/>
                  </ListItem>
                </List>
              </Collapse>
            </List>
            <Divider />
            <Notifications {...props} />
            <List subheader={
              <ListSubheader color="primary">
                <FormattedMessage id="global.access.title"/>
              </ListSubheader>
            }>
              <ListItem>
                <ListItemText 
                  primary={layoutState.user.company.name} 
                  secondary={layoutState.user.position.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        )}
        <List 
            subheader={
            <ListSubheader color="primary">
              <FormattedMessage id="global.setting.title"/>
            </ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Right hand" />
            <ListItemSecondaryAction>
              <Switch color="primary"
                onChange={() => layoutDispatch.changeAnchor(layoutState.anchor === 'right' ? 'left' : 'right')}
                checked={layoutState.anchor === 'right'}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};