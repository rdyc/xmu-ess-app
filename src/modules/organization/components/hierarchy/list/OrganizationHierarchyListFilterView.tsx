import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
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

import { FilterCompany } from '@lookup/components/company/select';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { OrganizationHierarchyListFilterProps } from './OrganizationHierarchyListFilter';

export const OrganizationHierarchyListFilterView: React.SFC<OrganizationHierarchyListFilterProps> = props => (
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
            (props.filterCustomer || props.filterType || props.filterStatus || props.filterCompletion || props.filterRejected) &&
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
          <ListItem button onClick={props.handleFilterCompanyVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid)}
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

        </List>
      </DialogContent>
    </Dialog>

    <FilterCompany
      title={props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid)}
      hideBackdrop={true}
      isOpen={props.isFilterCompanyOpen} 
      // filter={props.filterCompanyDialog}
      onSelected={props.handleFilterCompanyOnSelected} 
      onClose={props.handleFilterCompanyOnClose}
    />
  </React.Fragment>
);