import { AccountEmployeeDialog } from '@account/components/dialog';
import { layoutMessage } from '@layout/locales/messages';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
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
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

import { LeaveCancellationListFilterProps } from './LeaveCancellationListFilter';

export const LeaveCancellationListFilterView: React.SFC<LeaveCancellationListFilterProps> = props => (
  < React.Fragment >
  <Dialog
    fullScreen
    disableBackdropClick
    open={props.isOpen}
    className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
    scroll="paper"
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

        {
          (props.filterEmployee) &&
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

    <DialogContent className={props.classes.paddingDisabled}>
      <List>
        <ListItem button onClick={props.handleFilterEmployeeVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(leaveMessage.request.field.employeeUid)}
            secondary={props.filterEmployee && props.filterEmployee.fullName || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterEmployee &&
              <IconButton onClick={props.handleFilterEmployeeOnClear}>
                <ClearIcon />
              </IconButton>
            }
            <IconButton onClick={props.handleFilterEmployeeVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
    </DialogContent>
  </Dialog>

  <AccountEmployeeDialog
    isOpen={props.isFilterEmployeeOpen}
    title={props.intl.formatMessage(summaryMessage.winningRatio.field.name)}
    value={props.filterEmployee && props.filterEmployee.uid}
    filter={{
      companyUids: props.userState.user && props.userState.user.company.uid,
      orderBy: 'fullName',
      direction: 'ascending'
    }}
    hideBackdrop={true}
    onSelected={props.handleFilterEmployeeOnSelected}
    onClose={props.handleFilterEmployeeOnClose}
  />
  </React.Fragment >
);
