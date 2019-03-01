import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@material-ui/core';
import * as React from 'react';

import { DialogConfirmation } from '../dialogs';
import { PopupMenu } from '../PopupMenu';
import { NavigationHeaderProps } from './NavigationHeader';

export const NavigationHeaderView: React.ComponentType<NavigationHeaderProps> = props => (
  <ListSubheader 
    disableGutters 
    component="div" 
    className={props.classes.toolbar}
  >
    <Toolbar>
      {
        props.userState.user &&
        <React.Fragment>
          <ListItemAvatar>
            <Avatar className={props.classes.avatarPrimary}>
              {props.nameInitial}
            </Avatar>
          </ListItemAvatar>
          
          <ListItemText
            primary={props.userState.user.fullName}
            secondary={`${props.userState.user.company.code} - ${props.userState.user.position.name}`}
            primaryTypographyProps={{
              // variant: 'body2',
              noWrap: true
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              noWrap: true
            }}
          />

          {
            props.menuOptions &&
            <ListItemSecondaryAction>
              <PopupMenu
                id="user-nav-option"
                selectable={false}
                menuOptions={props.menuOptions}
                onSelected={props.handleOnSelectedMenu}
              />
            </ListItemSecondaryAction>
          }
        </React.Fragment>
      }
    </Toolbar>
    
    <Divider/>

    <DialogConfirmation 
      isOpen={props.isDialogAccessOpen}
      title={props.intl.formatMessage(layoutMessage.dialog.accessTitle)}
      content={props.intl.formatMessage(layoutMessage.dialog.accessContent)}
      labelCancel={props.intl.formatMessage(layoutMessage.action.discard)}
      labelConfirm={props.intl.formatMessage(layoutMessage.action.continue)}
      onClickCancel={props.handleOnClickAccess}
      onClickConfirm={props.handleOnClickAccessConfirmed}
    />

    <DialogConfirmation 
      isOpen={props.isDialogLogoutOpen}
      title={props.intl.formatMessage(layoutMessage.dialog.logoutTitle)}
      content={props.intl.formatMessage(layoutMessage.dialog.logoutContent)}
      labelCancel={props.intl.formatMessage(layoutMessage.action.no)}
      labelConfirm={props.intl.formatMessage(layoutMessage.action.yes)}
      onClickCancel={props.handleOnClickLogout}
      onClickConfirm={props.handleOnClickLogoutConfirmed}
    />  
  </ListSubheader>
);