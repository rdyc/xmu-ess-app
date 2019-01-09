import { EmployeeDialog } from '@account/components/dialog';
import { layoutMessage } from '@layout/locales/messages';
import { AppBar, Badge, Button, Dialog, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Tooltip, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import { ProjectAssignmentDialog } from '@project/components/dialog/assignment';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EffectivenessFilterProps } from './EffectivenessFilter';

export const EffectivenessFilterView: React.SFC<EffectivenessFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.filterEmployee !== undefined ||
      props.filterProject !== undefined;
  };

  const filterDialog = () => {
    return (
      <div>
        <Dialog
          fullScreen
          disableBackdropClick
          open={props.isFilterDialogOpen}
          className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
          onClose={props.handleFilterVisibility}
        >
          <AppBar className={props.classes.appBarDialog}>
            <Toolbar>
              <IconButton color="inherit" onClick={props.handleFilterVisibility} aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" className={props.classes.flex}>
                {props.intl.formatMessage(layoutMessage.tooltip.filter)}
              </Typography>

              {
                (props.filterProject || props.filterEmployee) &&
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

          <ListItem button onClick={props.handleFilterEmployeeVisibility}>
              <ListItemText 
                primary={props.intl.formatMessage(summaryMessage.filter.employeeUid)}
                secondary={props.filterEmployee && props.filterEmployee.fullName || props.intl.formatMessage(layoutMessage.text.none)}
              />
              <ListItemSecondaryAction>
                { 
                  props.filterEmployee &&
                  <IconButton onClick={props.handleFilterEmployeeOnClear}>
                    <ClearIcon />
                  </IconButton> 
                }

                <IconButton onClick={props.handleFilterEmployeeVisibility}>
                  <ChevronRightIcon />
                </IconButton> 
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
                
            <ListItem button onClick={props.filterEmployee && props.handleFilterProjectVisibility} disabled={!props.filterEmployee}>
              <ListItemText 
                primary={props.intl.formatMessage(summaryMessage.filter.projectUid)}
                secondary={props.filterProject && props.filterProject.name || props.intl.formatMessage(layoutMessage.text.none)}
              />
              <ListItemSecondaryAction>
                { 
                  props.filterProject &&
                  <IconButton onClick={props.handleFilterProjectOnClear}>
                    <ClearIcon />
                  </IconButton> 
                }

                <IconButton onClick={props.filterEmployee && props.handleFilterProjectVisibility} disabled={!props.filterEmployee}>
                  <ChevronRightIcon />
                </IconButton> 
              </ListItemSecondaryAction>
            </ListItem>

          </List>
        </Dialog>

        <EmployeeDialog 
          hideBackdrop={true}
          isOpen={props.isFilterEmployeeOpen} 
          filter={props.filterEmployeeDialog}
          onSelected={props.handleFilterEmployeeOnSelected} 
          onClose={props.handleFilterEmployeeOnClose}
        />

        <ProjectAssignmentDialog 
          hideBackdrop={true}
          isOpen={props.isFilterProjectOpen} 
          filter={props.filterProjectDialog}
          onSelected={props.handleFilterProjectOnSelected} 
          onClose={props.handleFilterProjectOnClose}
        />
      </div>
    );
  };

  return (
    <Toolbar disableGutters>
      <Typography
        noWrap
        variant="body2"
        className={props.className}
      >
        {
          props.isLoading &&
          <FormattedMessage {...layoutMessage.text.loading} />
        }
      </Typography>
      
      <Tooltip
        placement="bottom"
        title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
      >
        <IconButton
          disabled={props.isLoading}
          onClick={props.handleFilterVisibility} 
        >
          <Badge
            invisible={!showBadgeWhen()}
            badgeContent={<CheckCircleIcon color="primary" />}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {filterDialog()}

      <Tooltip
        placement="bottom"
        title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
      >
        <IconButton 
          id="option-sync"
          disabled={props.isLoading}
          onClick={props.onClickSync}
        >
          <SyncIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};