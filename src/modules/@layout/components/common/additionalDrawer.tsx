import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setAccountShow, setCurrentPage, setAdditionalDrawer, setAnchor, setLogoutDialog } from '@layout/store/actionCreators';
import { Anchor } from '@layout/types';
import { ILookupRoleMenuList } from '@lookup/interfaces/ILookupRoleMenuList';
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
  Drawer,
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

import Notifications from './notifications';

// tslint:disable-next-line:max-line-length
interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  menuItems: ILookupRoleMenuList[];
  active: ICurrentPage;
  user: IAppUser;
  logoutDialog: boolean;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setActive: typeof setCurrentPage;
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
      AppUserManager.signoutRedirect();
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
        anchor={props.anchor === 'left' ? 'right' : 'left'}
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
              <ListItem 
                button
                onClick={() => props.setAccountShow(!props.accountShow)}>
                <Avatar className={props.classes.avatarRed}>
                  {props.user.company.code}
                </Avatar>
                <ListItemText 
                  primary={props.user.fullName} 
                  secondary={props.user.email} />
                <ListItemSecondaryAction>
                  {props.accountShow ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={props.accountShow} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={() => props.history.push('/account/profile')}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText inset primary={<FormattedMessage id="global.profile.my.title"/>} />
                  </ListItem>
                  <ListItem button onClick={() => props.history.push('/')}>
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
              <FormattedMessage id="global.setting.title"/>
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