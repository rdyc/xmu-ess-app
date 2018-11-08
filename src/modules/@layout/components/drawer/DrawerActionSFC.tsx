import NotificationListSFC from '@layout/components/notification/NotificationListSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
        }}
      >
        {userState.user && (
          <div>
            <List disablePadding>
              <ListItem 
                button
                onClick={() => layoutState.isAccountExpanded ? layoutDispatch.accountColapse() : layoutDispatch.accountExpand()}
              >
                <ListItemText 
                  primary={userState.user.fullName} 
                  secondary={userState.user.email}
                  primaryTypographyProps={{
                    noWrap: true,
                    variant: 'body1'
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    variant: 'caption'
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
                    <ListItemText inset 
                      primary={<FormattedMessage id="global.profile.my.title"/>}
                      primaryTypographyProps={{
                        variant: 'body1'
                      }}
                    />
                  </ListItem>
                  <ListItem button onClick={() => history.push('/account/access')}>
                    <ListItemIcon>
                      <SwapHorizontalCircle />
                    </ListItemIcon>
                    <ListItemText inset 
                      primary={<FormattedMessage id="global.access.switch.title"/>}
                      primaryTypographyProps={{
                        variant: 'body1'
                      }}
                    />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <PowerSettingsNew /> 
                    </ListItemIcon>
                    <ListItemText inset 
                      primary={<FormattedMessage id="global.logout.title"/>}
                      primaryTypographyProps={{
                        variant: 'body1'
                      }}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>

            <NotificationListSFC />
          </div>
        )}
        
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