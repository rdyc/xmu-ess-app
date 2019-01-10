import { layoutMessage } from '@layout/locales/messages';
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

import { EmployeeDialog } from '@account/components/dialog';
import { InputDateWithValue } from '@layout/components/input/date';
import { GlobalFormat } from '@layout/types';
import { FilterCompany } from '@lookup/components/company/select';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import { BillableListFilterProps } from './BillableListFilter';

export const BillableListFilterView: React.SFC<BillableListFilterProps> = props => (
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
            (props.filterCompany || props.filterRole) &&
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

        <ListItem button onClick={props.handleFilterCompanyVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(summaryMessage.billable.field.company)}
            secondary={props.filterCompany && props.filterCompany.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCompany &&
              <IconButton onClick={props.handleFilterCompanyOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterCompanyVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterEmployeeVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(summaryMessage.billable.field.name)}
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

        <ListItem button onClick={props.handleFilterStartVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(summaryMessage.billable.field.start)}
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
            primary={props.intl.formatMessage(summaryMessage.billable.field.end)}
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

      </List>

      <FilterCompany 
        title={props.intl.formatMessage(summaryMessage.billable.field.company)}
        hideBackdrop={true}
        isOpen={props.isFilterCompanyOpen}
        value={props.filterCompany && props.filterCompany.uid}
        onSelected={props.handleFilterCompanyOnSelected}
        onClose={props.handleFilterCompanyOnClose}        
      />

      <EmployeeDialog
        hideBackdrop={true}
        isOpen={props.isFilterEmployeeOpen}
        onSelected={props.handleFilterEmployeeOnSelected}
        onClose={props.handleFilterEmployeeOnClose}
      />

      <InputDateWithValue 
        label={props.intl.formatMessage(summaryMessage.billable.field.start)}
        val={props.filterStart}
        onSelected={props.handleFilterStartOnSelected}
        isOpen={props.isFilterStartOpen}
        onClose={props.handleFilterStartOnClose}
      />

      <InputDateWithValue 
        label={props.intl.formatMessage(summaryMessage.billable.field.end)}
        val={props.filterEnd}
        onSelected={props.handleFilterEndOnSelected}
        isOpen={props.isFilterEndOpen}
        onClose={props.handleFilterEndOnClose}
      />
    </Dialog>
  </React.Fragment>
);