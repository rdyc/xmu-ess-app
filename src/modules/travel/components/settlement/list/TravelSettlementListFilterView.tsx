import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { ModuleDefinition } from '@layout/helper/redirector';
import { layoutMessage } from '@layout/locales/messages';
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
import { ProjectRegistrationDialog } from '@project/components/dialog/project';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementListFilterProps } from './TravelSettlementListFilter';

export const TravelSettlementListFilterView: React.SFC<TravelSettlementListFilterProps> = props => (
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
            (props.filterCustomer || props.filterProject || props.filterType || props.filterStatus || props.filterCompletion || props.filterRejected) &&
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
            primary={props.intl.formatMessage(travelMessage.request.field.customerUid)}
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

        <ListItem button onClick={props.filterCustomer && props.handleFilterProjectVisibility} disabled={!props.filterCustomer}>
          <ListItemText
            primary={props.intl.formatMessage(travelMessage.request.field.projectUid)}
            secondary={props.filterProject && props.filterProject.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterProject &&
              <IconButton onClick={props.handleFilterProjectOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.filterCustomer && props.handleFilterProjectVisibility} disabled={!props.filterCustomer}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterStatusVisibility}>
          <ListItemText
            primary={props.intl.formatMessage(travelMessage.request.field.statusType)}
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
            primary={props.intl.formatMessage(travelMessage.request.field.isAdjustmentNeeded)}
            secondary={props.intl.formatMessage(props.filterRejected ? layoutMessage.action.yes : layoutMessage.action.no)}
          />
          <ListItemSecondaryAction>
            <Switch
              color="primary"
              checked={props.filterRejected || false}
              onChange={props.handleFilterRejectedOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>
      </DialogContent>
    </Dialog>

    <LookupCustomerDialog
      hideBackdrop={true}
      isOpen={props.isFilterCustomerOpen}
      onSelected={props.handleFilterCustomerOnSelected}
      onClose={props.handleFilterCustomerOnClose}
    />

    <ProjectRegistrationDialog
      hideBackdrop={true}
      isOpen={props.isFilterProjectOpen}
      filter={props.filterProjectDialog}
      onSelected={props.handleFilterProjectOnSelected}
      onClose={props.handleFilterProjectOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(travelMessage.request.field.statusType)}
      category="status"
      moduleType={ModuleDefinition.TravelSettlement}
      hideBackdrop={true}
      isOpen={props.isFilterStatusOpen}
      value={props.filterStatus && props.filterStatus.type}
      onSelected={props.handleFilterStatusOnSelected}
      onClose={props.handleFilterStatusOnClose}
    />

  </React.Fragment>
);