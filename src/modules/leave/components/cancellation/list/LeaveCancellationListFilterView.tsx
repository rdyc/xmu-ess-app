import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { layoutMessage } from '@layout/locales/messages';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import {
  AppBar,
  Button,
  Dialog,
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

import { LeaveCancellationListFilterProps } from './LeaveCancellationListFilter';

export const LeaveCancellationListFilterView: React.SFC<LeaveCancellationListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      onClose={props.onClose}
    >
      <AppBar className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.intl.formatMessage(layoutMessage.tooltip.filter)}
          </Typography>

          <Button 
            color="inherit" 
            onClick={props.handleFilterOnApply}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>
        </Toolbar>
      </AppBar>
      
      <List>
        
        <ListItem button onClick={props.handleFilterTypeVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(leaveMessage.request.field.leaveType)}
            secondary={props.filterType && props.filterType.name || props.intl.formatMessage(layoutMessage.text.none)} 
          />
          <ListItemSecondaryAction>
            { 
              props.filterType &&
              <IconButton onClick={props.handleFilterTypeOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterCompletionVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
    </Dialog>

    <LookupSystemDialog
      title={props.intl.formatMessage(leaveMessage.request.field.leaveType)}
      category="leave"
      hideBackdrop={true}
      isOpen={props.isFilterTypeOpen}
      value={props.filterType && props.filterType.type}
      onSelected={props.handleFilterTypeOnSelected}
      onClose={props.handleFilterTypeOnClose}
    />
  </React.Fragment>
);