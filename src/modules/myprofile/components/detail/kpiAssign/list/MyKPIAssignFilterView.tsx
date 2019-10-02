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

import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { MyKPIAssignFilterProps } from './MyKPIAssignFilter';

export const MyKPIAssignFilterView: React.SFC<MyKPIAssignFilterProps> = props => (
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
            (props.filterFinal && props.filterFinal.value !== '') &&
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
    </Dialog>
  </React.Fragment>
);