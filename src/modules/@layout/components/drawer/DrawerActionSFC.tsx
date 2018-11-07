import NotificationListSFC from '@layout/components/notification/NotificationListSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  IconButton,
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InvertColors from '@material-ui/icons/InvertColors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapHorizontalCircle from '@material-ui/icons/SwapHorizontalCircle';
import styles from '@styles';
import { AppUserManager } from '@utils/userManager';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, setDisplayName } from 'recompose';
import * as store from 'store';

type AllProps 
  = WithLayout 
  & WithUser
  & RouteComponentProps
  & WithStyles<typeof styles>;

const component: React.SFC<AllProps> = props => {
  const { userState, layoutState, layoutDispatch, history, classes } = props;

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
          paper: classNames(classes.drawerPaper, classes.drawerPaperAdditional)
        }}
        open={layoutState.isDrawerActionVisible}
        onOpen={() => layoutDispatch.drawerActionShow()}
        onClose={() => layoutDispatch.drawerActionHide()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        {userState.user && (
          <div>
            <List>
              <ListItem 
                button
                onClick={() => layoutState.isAccountExpanded ? layoutDispatch.accountColapse() : layoutDispatch.accountExpand()}>
                <Avatar className={classes.avatarRed}>
                  {userState.user.company.code}
                </Avatar>
                <ListItemText 
                  primary={userState.user.fullName} 
                  secondary={userState.user.email}
                  primaryTypographyProps={{
                    variant: 'body1'
                  }}
                  secondaryTypographyProps={{
                    variant: 'body1'
                  }}
                />
                <ListItemSecondaryAction>
                  {layoutState.isAccountExpanded ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
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
                  <ListItem button onClick={() => history.push('/account/access')}>
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

            <NotificationListSFC 
              // companyUid={layoutState.user.company.uid}
              // positionUid={layoutState.user.position.uid} 
            />
            
            <List subheader={
              <ListSubheader>
                <FormattedMessage id="global.access.title"/>
              </ListSubheader>
            }>
              <ListItem>
                <ListItemText 
                  primary={userState.user.company.name} 
                  secondary={userState.user.position.name}
                  primaryTypographyProps={{
                    variant: 'body1'
                  }}
                  secondaryTypographyProps={{
                    variant: 'body1'
                  }}
                />
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
          <ListSubheader>
            <FormattedMessage id="global.setting.title"/>
          </ListSubheader>}
          >
          <ListItem>
            <ListItemIcon>
              <InvertColors />
            </ListItemIcon>
            <ListItemText 
              primary="Dark Theme"
              primaryTypographyProps={{
                variant: 'body1'
              }}
            />
            <ListItemSecondaryAction>
              <Switch color="secondary"
                onChange={() => layoutDispatch.themeChange()}
                checked={layoutState.theme.palette.type === 'dark'}
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
                variant: 'body1'
              }}
            />
            <ListItemSecondaryAction>
              <Switch color="secondary"
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

const DrawerActionSFC = compose<AllProps, {}>(
  setDisplayName('DrawerActionSFC'),
  withUser,
  withLayout,
  withRouter,
  withStyles(styles)
)(component);

export default DrawerActionSFC;