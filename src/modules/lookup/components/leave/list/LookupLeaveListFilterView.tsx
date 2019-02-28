import { layoutMessage } from '@layout/locales/messages';
import { FilterCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

import { LookupLeaveListFilterProps } from './LookupLeaveListFilter';

export const LookupLeaveListFilterView: React.SFC<LookupLeaveListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      className={props.theme.direction === 'rtl' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      disableBackdropClick
      open={props.isOpen}
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
            (props.filterCompany) &&
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
          <ListItem button onClick={props.handleFilterCompanyVisibility}>
            <ListItemText
              primary={props.intl.formatMessage(lookupMessage.leave.field.company)}
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

        </List>
      </DialogContent>
    </Dialog>

    <FilterCompany
      title={props.intl.formatMessage(lookupMessage.leave.field.company)}
      hideBackdrop={true}
      isOpen={props.isFilterCompanyOpen}
      value={props.filterCompany && props.filterCompany.uid}
      onSelected={props.handleFilterCompanyOnSelected}
      onClose={props.handleFilterCompanyOnClose}
    />

  </React.Fragment>
);