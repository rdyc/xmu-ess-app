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

import { FilterCompany } from '@lookup/components/company/select';
import { FilterRole } from '@lookup/components/role/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { LookupMileageExceptionFilterProps } from './LookupMileageExceptionFilter';

export const LookupMileageExceptionFilterView: React.SFC<LookupMileageExceptionFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.theme.direction === 'rtl' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
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

      <Divider/>

      <List>
        <ListItem button onClick={props.handleFilterCompanyVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(lookupMessage.mileageException.field.company)}
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

        <ListItem button onClick={props.handleFilterRoleVisibility} disabled={props.filterRoleValue && props.filterCompany ? false : true}>
          <ListItemText 
            primary={props.intl.formatMessage(lookupMessage.mileageException.field.role)}
            secondary={props.filterCompany && props.filterRole && props.filterRole.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCompany && props.filterRole &&
              <IconButton onClick={props.handleFilterRoleOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterRoleVisibility} disabled={props.filterRoleValue && props.filterCompany ? false : true}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>

      <FilterCompany 
        title={props.intl.formatMessage(lookupMessage.mileageException.field.company)}
        hideBackdrop={true}
        isOpen={props.isFilterCompanyOpen}
        value={props.filterCompany && props.filterCompany.uid}
        onSelected={props.handleFilterCompanyOnSelected}
        onClose={props.handleFilterCompanyOnClose}        
      />

      <FilterRole
        title={props.intl.formatMessage(lookupMessage.mileageException.field.role)}
        hideBackdrop={true}
        isOpen={props.isFilterRoleOpen}
        value={props.filterRole && props.filterRole.uid}
        onSelected={props.handleFilterRoleOnSelected}
        onClose={props.handleFilterRoleOnClose}
        filter={props.filterRoleValue}
      />
    </Dialog>
  </React.Fragment>
);