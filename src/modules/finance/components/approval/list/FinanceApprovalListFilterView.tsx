import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType } from '@layout/types';
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

import { FinanceApprovalListFilterProps } from './FinanceApprovalListFilter';

export const FinanceApprovalListFilterView: React.SFC<FinanceApprovalListFilterProps> = props => (
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
            (props.filterStatus || props.filterModule) &&
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
          <ListItem button onClick={props.handleFilterModuleVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(financeMessage.approval.field.moduleName)}
              secondary={props.filterModule && props.filterModule.name || props.intl.formatMessage(layoutMessage.text.none)} 
            />
            <ListItemSecondaryAction>
            { 
                props.filterModule &&
                <IconButton onClick={props.handleFilterModuleOnClear}>
                  <ClearIcon />
                </IconButton> 
              }

              <IconButton onClick={props.handleFilterModuleVisibility}>
                <ChevronRightIcon />
              </IconButton> 
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem button onClick={props.handleFilterStatusVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(financeMessage.approval.field.status)}
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
        </List>
      </DialogContent>
    </Dialog>

    <LookupSystemDialog
      title={props.intl.formatMessage(financeMessage.approval.field.moduleName)}
      category="finance"
      hideBackdrop={true}
      moduleType={ModuleDefinitionType.Finance}
      isOpen={props.isFilterModuleOpen}
      value={props.filterModule && props.filterModule.type}
      onSelected={props.handleFilterModuleOnSelected}
      onClose={props.handleFilterModuleOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(expenseMessage.request.field.status)}
      category="payment"
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />
  </React.Fragment>
);