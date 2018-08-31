import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// tslint:disable-next-line:max-line-length
import { WithStyles, Drawer, Divider, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Avatar, IconButton, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapHorizontalCircle from '@material-ui/icons/SwapHorizontalCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import * as store from 'store';
import { ConnectedReduxProps } from '../store';
// tslint:disable-next-line:max-line-length
import { Anchor, setAdditionalDrawer, setAccountShow, setActive, Active, AppUser, setAnchor, setLogoutDialog } from '../store/@layout';
import styles from '../styles';
import { LookupRoleMenuListType } from '../store/lookup/types/LookupRoleMenuListType';
import * as classNames from 'classnames';
import Notifications from './notifications';
import userManager from '../utils/userManager';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  menuItems: LookupRoleMenuListType[];
  active: Active;
  user: AppUser;
  logoutDialog: boolean;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setActive: typeof setActive;
  setAccountShow: typeof setAccountShow;
  setLogoutDialog: typeof setLogoutDialog;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const additionalDrawer: React.SFC<AllProps> = props => {
  const handleLogout = () => {
    props.setAdditionalDrawer(!props.additionalDrawer);
    props.setLogoutDialog(!props.logoutDialog);
  };

  const handleClose = (confirm: boolean) => {
    props.setLogoutDialog(!props.logoutDialog);

    if (confirm) {
      store.clearAll();
      userManager.signoutRedirect();
    }
  };

  const logoutDialog = (
    <Dialog
      open={props.logoutDialog}
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
      <Drawer
        variant="temporary"
        anchor={props.anchor === 'left' ? 'right' : 'bottom'}
        open={props.additionalDrawer}
        classes={{
          paper: classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)
        }}
        onClose={() => props.setAdditionalDrawer(!props.additionalDrawer)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        {props.user && (
          <div>
            <List>
              <ListItem>
                <Avatar className={props.classes.avatarRed}>
                  {props.user.company.code}
                </Avatar>
                <ListItemText 
                  primary={props.user.fullName} 
                  secondary={props.user.email} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => props.setAccountShow(!props.accountShow)}>
                    {props.accountShow ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={props.accountShow} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={() => props.history.push('/account/profile')}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="My Profile" />
                  </ListItem>
                  <ListItem button onClick={() => props.history.push('/')}>
                    <ListItemIcon>
                      <SwapHorizontalCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="Switch Access" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <PowerSettingsNew /> 
                    </ListItemIcon>
                    <ListItemText inset primary="Logout" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            <Divider />
            <Notifications/>
            <List subheader={<ListSubheader color="primary">Access</ListSubheader>}>
              <ListItem>
                <ListItemText 
                  primary={props.user.company.name} 
                  secondary={props.user.position.name} />
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
              Settings
            </ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Right hand" />
            <ListItemSecondaryAction>
              <Switch color="primary"
                onChange={() => props.setAnchor(props.anchor === 'right' ? 'left' : 'right')}
                checked={props.anchor === 'right'}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};