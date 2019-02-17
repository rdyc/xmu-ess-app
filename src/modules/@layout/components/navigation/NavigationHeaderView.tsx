import AppMenu from '@constants/AppMenu';
import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Collapse,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, PowerSettingsNew, SwapHorizontalCircle } from '@material-ui/icons';
import InvertColors from '@material-ui/icons/InvertColors';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
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
            align: 'center',
            noWrap: true
          }}
          secondaryTypographyProps={{
            variant: 'body2',
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
          <ListItem button onClick={props.handleOnClickTheme}>
            <ListItemIcon>
              <InvertColors />
            </ListItemIcon>
            <ListItemText 
              primary={props.intl.formatMessage(layoutMessage.label.theme)}
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
            <ListItemSecondaryAction>
              <Switch color="secondary"
                onChange={() => props.handleOnClickTheme()}
                checked={props.layoutState.theme.palette ? props.layoutState.theme.palette.type === 'dark' : false}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button onClick={props.handleOnClickAnchor}>
            <ListItemIcon>
              <SwapHoriz/>
            </ListItemIcon>
            <ListItemText 
              primary={props.intl.formatMessage(props.layoutState.anchor === 'left' ? layoutMessage.label.anchorRight : layoutMessage.label.anchorLeft)}
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
            <ListItemSecondaryAction>
              <Switch color="secondary"
                onChange={() => props.handleOnClickAnchor()}
                checked={props.layoutState.anchor === 'right'}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button disabled={props.userState.user.access.length <= 1} onClick={props.handleOnClickAccess}>
            <ListItemIcon className={props.classes.drawerPaperMenuItem}>
              <SwapHorizontalCircle color="action" />
            </ListItemIcon>
            <ListItemText
              primary={props.intl.formatMessage(layoutMessage.label.switch)}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItem>

          <ListItem button onClick={props.handleOnClickLogout}>
            <ListItemIcon className={props.classes.drawerPaperMenuItem}>
              <PowerSettingsNew color="action"  /> 
            </ListItemIcon>
            <ListItemText
              primary={props.intl.formatMessage(layoutMessage.label.logout)}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItem>

          <Divider/>
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