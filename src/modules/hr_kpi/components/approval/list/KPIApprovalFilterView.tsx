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

import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { ModuleDefinitionType } from '@layout/types';
import { FilterCompany } from '@lookup/components/company/select';
import { KPIApprovalFilterProps } from './KPIApprovalFilter';

export const KPIApprovalFilterView: React.SFC<KPIApprovalFilterProps> = props => (
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
            (props.filterStatus || props.filterCompany ||
            (!props.filterCompletion || props.filterCompletion && props.filterCompletion.value !== 'pending') ||
            (props.filterFinal && props.filterFinal.value !== '')) &&
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
            primary={props.intl.formatMessage(kpiMessage.template.field.companyUid)}
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

        <ListItem button onClick={props.handleFilterStatusVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.employee.field.status)}
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

        <ListItem button onClick={props.handleFilterCompletionVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.employee.field.completion)}
            secondary={props.filterCompletion && props.filterCompletion.name || props.intl.formatMessage(layoutMessage.text.all)} 
          />
          <ListItemSecondaryAction>
          { 
              (!props.filterCompletion || props.filterCompletion && props.filterCompletion.value !== 'pending') &&
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
      </List>

      <FilterCompany 
        title={props.intl.formatMessage(kpiMessage.template.field.companyUid)}
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

      <LookupSystemDialog
        title={props.intl.formatMessage(kpiMessage.employee.field.status)}
        category="status"
        moduleType={ModuleDefinitionType.HR_KPI}
        hideBackdrop={true}
        isOpen={props.isFilterStatusOpen}
        value={props.filterStatus && props.filterStatus.type}
        onSelected={props.handleFilterStatusOnSelected}
        onClose={props.handleFilterStatusOnClose}
      />

      <DialogValue
        title={props.intl.formatMessage(kpiMessage.employee.field.completion)}
        isOpen={props.isFilterCompletionOpen}
        hideBackdrop={true}
        items={props.completionStatus}
        value={props.filterCompletion && props.filterCompletion.value}
        onSelected={props.handleFilterCompletionOnSelected}
        onClose={props.handleFilterCompletionOnClose}
        isCompletion={true}
      />
    </Dialog>
  </React.Fragment>
);