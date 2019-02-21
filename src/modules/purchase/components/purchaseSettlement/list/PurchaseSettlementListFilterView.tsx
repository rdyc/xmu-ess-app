import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType } from '@layout/types';
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
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';

import { PurchaseSettlementListFilterProps } from './PurchaseSettlementListFilter';

export const PurchaseSettlementListFilterView: React.SFC<PurchaseSettlementListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      disableBackdropClick
      open={props.isOpen}
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
            (props.filterCustomer || props.filterStatus || props.filterProject || props.filterRejected) &&
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
              primary={props.intl.formatMessage(purchaseMessage.request.field.customerUid)}
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

        <ListItem button onClick={props.handleFilterStatusVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(purchaseMessage.request.field.statusType)}
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
            primary={props.intl.formatMessage(purchaseMessage.settlement.field.isNeedAdjust)}
            secondary={props.intl.formatMessage(props.filterRejected ? layoutMessage.action.yes : layoutMessage.action.no)}
          />
          <ListItemSecondaryAction>
            <Switch
              color="primary"
              checked={props.filterRejected || false}
              onChange={props.handleFilterRejectOnChange}
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
      title={props.intl.formatMessage(purchaseMessage.request.field.statusType)}
      category="status"
      moduleType={ModuleDefinitionType.PurchaseSettlement}
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />
  </React.Fragment>
);