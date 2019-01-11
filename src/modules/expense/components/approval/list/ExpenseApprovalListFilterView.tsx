import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
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
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';

import { InputDateWithValue } from '@layout/components/input/date';
import { GlobalFormat } from '@layout/types';
import { ProjectRegistrationDialog } from '@project/components/dialog/project';
import { ExpenseApprovalListFilterProps } from './ExpenseApprovalListFilter';

export const ExpenseApprovalListFilterView: React.SFC<ExpenseApprovalListFilterProps> = props => (
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

          {
            (props.filterCustomer || props.filterType || props.filterStatus || props.filterStart || props.filterEnd || props.filterCompletion || props.filterNotify) &&
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
            primary={props.intl.formatMessage(expenseMessage.request.field.customerUid)}
            secondary={props.filterCustomer && props.filterCustomer.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            { 
              props.filterCustomer &&
              <IconButton onClick={props.handleFilterCustomerOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterCustomerVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.filterCustomer && props.handleFilterProjectVisibility} disabled={!props.filterCustomer}>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.projectUid)}
            secondary={props.filterProject && props.filterProject.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            { 
              props.filterProject &&
              <IconButton onClick={props.handleFilterProjectOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.filterCustomer && props.handleFilterProjectVisibility} disabled={!props.filterCustomer}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterTypeVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.expenseType)}
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

        <ListItem button onClick={props.handleFilterStartVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.start)}
            secondary={props.filterStart && props.intl.formatDate(props.filterStart, GlobalFormat.Date) || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterStart &&
              <IconButton onClick={props.handleFilterStartOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterStartVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterEndVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.end)}
            secondary={props.filterEnd && props.intl.formatDate(props.filterEnd, GlobalFormat.Date) || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterEnd &&
              <IconButton onClick={props.handleFilterEndOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterEndVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterCompletionVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.completion)}
            secondary={props.filterCompletion && props.filterCompletion.name || props.intl.formatMessage(layoutMessage.text.none)} 
          />
          <ListItemSecondaryAction>
          { 
              props.filterCompletion &&
              <IconButton onClick={props.handleFilterCompletionOnClear}>
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
            primary={props.intl.formatMessage(expenseMessage.request.field.status)}
            secondary={props.filterStatus && props.filterStatus.name || props.intl.formatMessage(layoutMessage.text.none)} 
          />
          <ListItemSecondaryAction>
          { 
              props.filterStatus &&
              <IconButton onClick={props.handleFilterStatusOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterStatusVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(expenseMessage.request.field.isNotify)}
            secondary={props.intl.formatMessage(props.filterNotify ? layoutMessage.action.yes : layoutMessage.action.no)}
          />
          <ListItemSecondaryAction>
            <Switch
              color="primary"
              checked={props.filterNotify || false}
              onChange={props.handleFilterRejectedOnChange}
            />
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
      filter={props.filterCustomerDialog}
    />

    <ProjectRegistrationDialog 
      hideBackdrop={true}
      isOpen={props.isFilterProjectOpen} 
      filter={props.filterProjectDialog}
      onSelected={props.handleFilterProjectOnSelected} 
      onClose={props.handleFilterProjectOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(expenseMessage.request.field.expenseType)}
      category="expense"
      hideBackdrop={true}
      isOpen={props.isFilterTypeOpen}
      value={props.filterType && props.filterType.type}
      onSelected={props.handleFilterTypeOnSelected}
      onClose={props.handleFilterTypeOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(expenseMessage.request.field.status)}
      category="status"
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />

    <InputDateWithValue 
      label={props.intl.formatMessage(expenseMessage.request.field.start)}
      val={props.filterStart}
      onSelected={props.handleFilterStartOnSelected}
      isOpen={props.isFilterStartOpen}
      onClose={props.handleFilterStartOnClose}
    />

    <InputDateWithValue 
      label={props.intl.formatMessage(expenseMessage.request.field.end)}
      val={props.filterEnd}
      onSelected={props.handleFilterEndOnSelected}
      isOpen={props.isFilterEndOpen}
      onClose={props.handleFilterEndOnClose}
    />

    <DialogValue
      title={props.intl.formatMessage(expenseMessage.request.field.completion)}
      isOpen={props.isFilterCompletionOpen}
      hideBackdrop={true}
      items={props.completionStatus}
      value={props.filterCompletion && props.filterCompletion.value || props.initialProps && props.initialProps.status}
      onSelected={props.handleFilterCompletionOnSelected}
      onClose={props.handleFilterCompletionOnClose}
    />
  </React.Fragment>
);