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
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';

import { accountMessage } from '@account/locales/messages/accountMessage';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { FilterCompany } from '@lookup/components/company/select';
import { AccountEmployeeAssignFilterProps } from './EmployeeAssignFilter';

export const EmployeeAssignFilterView: React.SFC<AccountEmployeeAssignFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.classes.shift}
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
            (props.filterCompany || props.filterStatus === false || props.filterNotAssign || props.filterFinal || props.filterYear) &&
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
            primary={props.intl.formatMessage(accountMessage.employee.filter.company)}
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

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(accountMessage.employee.filter.isActive)}
            secondary={props.intl.formatMessage(props.filterStatus ? layoutMessage.action.yes : layoutMessage.action.no) }
          />
          <ListItemSecondaryAction>
            <Switch
              color="secondary"
              checked={props.filterStatus || false}
              onChange={props.handleFilterStatusOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.employee.field.isNotAssigned)}
            secondary={props.intl.formatMessage(props.filterNotAssign ? layoutMessage.action.yes : layoutMessage.action.no) }
          />
          <ListItemSecondaryAction>
            <Switch
              color="secondary"
              checked={props.filterNotAssign || false}
              onChange={props.handleFilterNotAssignOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterFinalVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
            secondary={props.filterFinal && props.filterFinal.name || props.intl.formatMessage(layoutMessage.text.all)} 
          />
          <ListItemSecondaryAction>
          { 
              (props.filterFinal) &&
              <IconButton onClick={props.handleFilterFinalOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterFinalVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterYearVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.employee.field.year)}
            secondary={props.filterYear && props.filterYear.name || props.intl.formatMessage(layoutMessage.text.all)} 
          />
          <ListItemSecondaryAction>
          { 
              (props.filterYear) &&
              <IconButton onClick={props.handleFilterYearOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterYearVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>

      <FilterCompany 
        title={props.intl.formatMessage(accountMessage.employee.filter.company)}
        hideBackdrop={true}
        isOpen={props.isFilterCompanyOpen}
        value={props.filterCompany && props.filterCompany.uid}
        onSelected={props.handleFilterCompanyOnSelected}
        onClose={props.handleFilterCompanyOnClose}        
      />

      <DialogValue
        title={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
        isOpen={props.isFilterFinalOpen}
        hideBackdrop={true}
        items={props.finalStatus}
        value={props.filterFinal && props.filterFinal.value}
        onSelected={props.handleFilterFinalOnSelected}
        onClose={props.handleFilterFinalOnClose}
        isCompletion={true}
      />

      <DialogValue
        title={props.intl.formatMessage(kpiMessage.employee.field.year)}
        isOpen={props.isFilterYearOpen}
        hideBackdrop={true}
        items={props.yearOptions}
        value={props.filterYear && props.filterYear.value}
        onSelected={props.handleFilterYearOnSelected}
        onClose={props.handleFilterYearOnClose}
      />
    </Dialog>
  </React.Fragment>
);