import { LookupSystemDialog } from '@common/components/dialog/lookupSystemDialog/LookupSystemDialog';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { LookupDiemListFilterProps } from './LookupDiemListFilter';

export const LookupDiemListFilterView: React.SFC<LookupDiemListFilterProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
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
            (props.filterProjectType || props.filterDestinationType ) &&
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
        <ListItem button onClick={props.handleFilterProjectTypeVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(lookupMessage.lookupDiem.field.project)}
            secondary={props.filterProjectType && props.filterProjectType.name || props.intl.formatMessage(layoutMessage.text.none)} 
          />
          <ListItemSecondaryAction>
            { 
              props.filterProjectType &&
              <IconButton onClick={props.handleFilterProjectTypeOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterProjectTypeVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem button onClick={props.handleFilterDestinationTypeVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(lookupMessage.lookupDiem.field.destination)}
            secondary={props.filterDestinationType && props.filterDestinationType.name || props.intl.formatMessage(layoutMessage.text.none)} 
          />
          <ListItemSecondaryAction>
            { 
              props.filterDestinationType &&
              <IconButton onClick={props.handleFilterDestinationTypeOnClear}>
                <ClearIcon />
              </IconButton> 
            }

            <IconButton onClick={props.handleFilterDestinationTypeVisibility}>
              <ChevronRightIcon />
            </IconButton> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>
    </Dialog>

    <LookupSystemDialog
      title={props.intl.formatMessage(lookupMessage.lookupDiem.field.project)}
      category="project"
      hideBackdrop={true}
      isOpen={props.isFilterProjectTypeOpen}
      value={props.filterProjectType && props.filterProjectType.type}
      onSelected={props.handleFilterProjectTypeOnSelected}
      onClose={props.handleFilterProjectTypeOnClose}
    />

    <LookupSystemDialog
      title={props.intl.formatMessage(lookupMessage.lookupDiem.field.destination)}
      category="destination"
      hideBackdrop={true}
      isOpen={props.isFilterDestinationTypeOpen}
      value={props.filterDestinationType && props.filterDestinationType.type}
      onSelected={props.handleFilterDestinationTypeOnSelected}
      onClose={props.handleFilterDestinationTypeOnClose}
    />
  </React.Fragment>
);