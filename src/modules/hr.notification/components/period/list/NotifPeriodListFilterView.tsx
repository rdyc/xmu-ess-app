import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';

import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { NotifPeriodListFilterProps } from './NotifPeriodListFilter';

export const NotifPeriodListFilterView: React.SFC<NotifPeriodListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.classes.shift}
      scroll="paper"
      onClose={props.onClose}
    >
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.intl.formatMessage(layoutMessage.tooltip.filter)}
          </Typography>

          {
            props.filterType &&
            <Button color="inherit" onClick={props.handleFilterOnReset}>
              {props.intl.formatMessage(layoutMessage.action.reset)}
            </Button>
          }

          <Button 
            color="inherit" 
            onClick={props.handleFilterOnApply}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>
        </Toolbar>
      </AppBar>
      
      <Divider/>
      
      <DialogContent className={props.classes.paddingDisabled}>
        <List>
          <ListItem button onClick={props.handleFilterTypeVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(notifMessage.period.field.type)}
              secondary={props.filterType && props.filterType.name || props.intl.formatMessage(layoutMessage.text.none)} 
            />
            <ListItemSecondaryAction>
              { 
                props.filterType &&
                <IconButton onClick={props.handleFilterTypeOnClear}>
                  <ClearIcon />
                </IconButton> 
              }

              <IconButton onClick={props.handleFilterTypeVisibility}>
                <ChevronRightIcon />
              </IconButton> 
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

        </List>
      </DialogContent>
    </Dialog>

    <DialogValue
      title={props.intl.formatMessage(notifMessage.period.field.type)}
      isOpen={props.isFilterTypeOpen}
      hideBackdrop={true}
      items={props.periodTypes}
      value={props.filterType && props.filterType.value}
      onSelected={props.handleFilterTypeOnSelected}
      onClose={props.handleFilterTypeOnClose}
    />
  </React.Fragment>
);