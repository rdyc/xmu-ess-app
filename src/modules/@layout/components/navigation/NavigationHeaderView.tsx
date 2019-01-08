import AppMenu from '@constants/AppMenu';
import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, PowerSettingsNew, SwapHorizontalCircle } from '@material-ui/icons';
import * as React from 'react';

import { DialogConfirmation } from '../dialogs';
import { NavigationHeaderProps } from './NavigationHeader';

export const NavigationHeaderView: React.ComponentType<NavigationHeaderProps> = props => (
  <ListSubheader component="div" disableGutters className={props.classes.brandingContainer}>
    {
      props.userState.user &&
      <React.Fragment>
        <ListItemText
          className={props.classes.paddingWide}
          primary={props.userState.user.position.name}
          secondary={props.userState.user.company.name}
          primaryTypographyProps={{
            variant: 'body2',
            color: 'inherit',
            align: 'center',
            noWrap: true
          }}
          secondaryTypographyProps={{
            variant: 'body2',
            color: 'inherit',
            align: 'center',
            noWrap: true
          }}
        />

        <ListItem button onClick={() => props.onClickHeader(AppMenu.User)}>
          <ListItemAvatar>
            <Avatar className={props.classes.avatarSecondary}>
              {props.nameInitial}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.userState.user.fullName}
            secondary={props.userState.user.email}
            primaryTypographyProps={{
              variant: 'body2',
              color: 'inherit'
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              color: 'inherit',
              noWrap: true
            }}
          />
          <ListItemSecondaryAction>
            {props.headerUid === AppMenu.User ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
          </ListItemSecondaryAction>
        </ListItem>
        
        <Collapse in={props.headerUid === AppMenu.User}>
          <ListItem button disabled={props.userState.user.access.length <= 1} onClick={props.handleOnClickAccess}>
            <ListItemIcon className={props.classes.drawerPaperMenuItem}>
              <SwapHorizontalCircle/>
            </ListItemIcon>
            <ListItemText
              primary={props.intl.formatMessage(layoutMessage.label.switch)}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'inherit'
              }}
            />
          </ListItem>
          <ListItem button onClick={props.handleOnClickLogout}>
            <ListItemIcon className={props.classes.drawerPaperMenuItem}>
              <PowerSettingsNew /> 
            </ListItemIcon>
            <ListItemText
              primary={props.intl.formatMessage(layoutMessage.label.logout)}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'inherit'
              }}
            />
          </ListItem>
        </Collapse>

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
    </React.Fragment>     
  }
</ListSubheader>
);