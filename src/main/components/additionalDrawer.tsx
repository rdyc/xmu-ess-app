import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// tslint:disable-next-line:max-line-length
import { WithStyles, Drawer, Divider, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Avatar, IconButton, Collapse } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapHorizontalCircle from '@material-ui/icons/SwapHorizontalCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { ConnectedReduxProps } from '../store';
import { Anchor, setAdditionalDrawer, setAccountShow, setActive, Active, AppUser, setAnchor } from '../store/@layout';
import styles from '../styles';
import { LookupRoleMenuListType } from '../store/lookup/types/LookupRoleMenuListType';
import * as classNames from 'classnames';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  menuItems: LookupRoleMenuListType[];
  active: Active;
  user: AppUser;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setActive: typeof setActive;
  setAccountShow: typeof setAccountShow;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const additionalDrawer: React.SFC<AllProps> = props => (
  <div>
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
                  <ListItem button>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="My Profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SwapHorizontalCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="Switch Access" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText inset primary="Logout" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            <Divider />
            <List subheader={<ListSubheader color="primary">Access</ListSubheader>}>
              <ListItem>
                <ListItemText primary={props.user.company.name} secondary={props.user.position.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        )}
        <Divider />
        <List subheader={<ListSubheader color="primary">Settings</ListSubheader>}>
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