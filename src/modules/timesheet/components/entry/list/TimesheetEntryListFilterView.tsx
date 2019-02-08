import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { ModuleDefinition } from '@layout/helper/redirector';
import { layoutMessage } from '@layout/locales/messages';
import { LookupCustomerDialog } from '@lookup/components/customer/dialog';
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
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetEntryListFilterProps } from './TimesheetEntryListFilter';

export const TimesheetEntryListFilterView: React.SFC<TimesheetEntryListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      scroll="paper"
      onClose={props.onClose}
    >
      <AppBar position="fixed" className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.intl.formatMessage(layoutMessage.tooltip.filter)}
          </Typography>

          {
            (props.filterCustomer || props.filterActivityType || props.filterStatus || props.filterRejected || props.filterProject) &&
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

              <IconButton disabled>
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

          <ListItem>
            <ListItemText
              primary={props.intl.formatMessage(timesheetMessage.entry.field.isRejected)}
              secondary={props.intl.formatMessage(props.filterRejected ? layoutMessage.action.yes : layoutMessage.action.no)}
            />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                checked={props.filterRejected || false}
                onChange={props.handleFilterRejectedOnChange}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
      </DialogContent>
    </Dialog>

    <LookupCustomerDialog
      isOpen={props.isFilterCustomerOpen}
      value={props.filterCustomer && props.filterCustomer.uid}
      filter={{
        companyUid: props.userState.user && props.userState.user.company.uid,
        orderBy: 'name',
        direction: 'ascending'
      }}
      hideBackdrop={true}
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
      moduleType={ModuleDefinition.Timesheet}
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />

    {/* <DialogValue
      title={props.intl.formatMessage(timesheetMessage.entry.field.completion)}
      isOpen={props.isFilterCompletionOpen}
      hideBackdrop={true}
      items={props.completionStatus}
      value={props.filterCompletion && props.filterCompletion.value || props.initialProps && props.initialProps.status}
      onSelected={props.handleFilterCompletionOnSelected}
      onClose={props.handleFilterCompletionOnClose}
    /> */}
  </React.Fragment>
);