import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType } from '@layout/types';
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
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';

import { MileageRequestListFilterProps } from './MileageRequestListFilter';

export const MileageRequestListFilterView: React.SFC<MileageRequestListFilterProps> = props => (
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
            (props.filterMonth || 
              props.filterYear || 
              props.filterStatus || 
              !props.filterCompletion ||
              props.filterCompletion && props.filterCompletion.value !== 'pending' || 
              props.filterRejected) &&
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
        <ListItem button onClick={props.handleFilterYearVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(mileageMessage.request.field.year)}
            secondary={props.filterYear && props.filterYear.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterYear &&
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

        <ListItem button onClick={props.handleFilterMonthVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(mileageMessage.request.field.month)}
            secondary={props.filterMonth && props.filterMonth.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterMonth &&
              <IconButton onClick={props.handleFilterMonthOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterMonthVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterStatusVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(mileageMessage.request.field.statusType)}
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
            primary={props.intl.formatMessage(mileageMessage.request.field.completion)}
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

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(mileageMessage.request.field.isRejected)}
            secondary={props.intl.formatMessage(props.filterRejected ? layoutMessage.action.yes : layoutMessage.action.no)}
          />
          <ListItemSecondaryAction>
            <Switch
              color="secondary"
              checked={props.filterRejected || false}
              onChange={props.handleFilterRejectedOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>
    </Dialog>

    <DialogValue
      title={props.intl.formatMessage(mileageMessage.request.field.month)}
      isOpen={props.isFilterMonthOpen}
      hideBackdrop={true}
      items={props.monthList}
      value={props.filterMonth && props.filterMonth.value}
      onSelected={props.handleFilterMonthOnSelected}
      onClose={props.handleFilterMonthOnClose}
    />

    <DialogValue
      title={props.intl.formatMessage(mileageMessage.request.field.year)}
      isOpen={props.isFilterYearOpen}
      hideBackdrop={true}
      items={props.yearList}
      value={props.filterYear && props.filterYear.value}
      onSelected={props.handleFilterYearOnSelected}
      onClose={props.handleFilterYearOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(mileageMessage.request.field.statusType)}
      category="status"
      moduleType={ModuleDefinitionType.Mileage}
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />

    <DialogValue
      title={props.intl.formatMessage(mileageMessage.request.field.completion)}
      isOpen={props.isFilterCompletionOpen}
      hideBackdrop={true}
      items={props.completionStatus}
      value={props.filterCompletion && props.filterCompletion.value}
      onSelected={props.handleFilterCompletionOnSelected}
      onClose={props.handleFilterCompletionOnClose}
      isCompletion={true}
    />
  </React.Fragment>
);