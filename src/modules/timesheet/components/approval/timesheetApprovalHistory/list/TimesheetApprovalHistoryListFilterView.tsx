import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { LookupCustomerDialog } from '@lookup/components/customer/dialog';
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
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { TimesheetApprovalHistoryListFilterProps } from './TimesheetApprovalHistoryListFilter';

export const TimesheetApprovalHistoryListFilterView: React.SFC<TimesheetApprovalHistoryListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      disableBackdropClick
      open={props.isOpen}
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
            (props.filterCustomer || props.filterActivityType || props.filterStatus || props.filterCompletion) &&
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

      <List>
        <ListItem button onClick={props.handleFilterCustomerVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(timesheetMessage.entry.field.customerUid)}
            secondary={props.filterCustomer && props.filterCustomer.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCustomer &&
              <IconButton onClick={props.handleFilterCustomerOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton disabled>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterActivityTypeVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(timesheetMessage.entry.field.activityType)}
            secondary={props.filterActivityType && props.filterActivityType.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterActivityType &&
              <IconButton onClick={props.handleFilterActivityTypeOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterCompletionVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterStatusVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(timesheetMessage.entry.field.statusType)}
            secondary={props.filterStatus && props.filterStatus.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterStatus &&
              <IconButton onClick={props.handleFilterStatusOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton disabled>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterCompletionVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(timesheetMessage.entry.field.completion)}
            secondary={props.filterCompletion && props.filterCompletion.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCompletion &&
              <IconButton onClick={props.handleFilterCompletionOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton disabled>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>
    </Dialog>

    <LookupCustomerDialog
      hideBackdrop={true}
      isOpen={props.isFilterCustomerOpen}
      onSelected={props.handleFilterCustomerOnSelected}
      onClose={props.handleFilterCustomerOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(timesheetMessage.entry.field.activityType)}
      category="activity"
      hideBackdrop={true}
      isOpen={props.isFilterActivityTypeOpen}
      value={props.filterActivityType && props.filterActivityType.type}
      onSelected={props.handleFilterActivityTypeOnSelected}
      onClose={props.handleFilterActivityTypeOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(timesheetMessage.entry.field.statusType)}
      category="status"
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />

    <DialogValue
      title={props.intl.formatMessage(timesheetMessage.entry.field.completion)}
      isOpen={props.isFilterCompletionOpen}
      hideBackdrop={true}
      items={props.completionStatus}
      value={props.filterCompletion && props.filterCompletion.value || props.initialProps && props.initialProps.status}
      onSelected={props.handleFilterCompletionOnSelected}
      onClose={props.handleFilterCompletionOnClose}
    />
  </React.Fragment>
);