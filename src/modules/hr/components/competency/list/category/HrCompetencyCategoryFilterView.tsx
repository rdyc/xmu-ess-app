import { hrMessage } from '@hr/locales/messages/hrMessage';
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
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';
import { FilterCluster } from '../../select/FilterCluster';
import { HrCompetencyCategoryFilterProps } from './HrCompetencyCategoryFilter';

export const HrCompetencyCategoryFilterView: React.SFC<HrCompetencyCategoryFilterProps> = props => {
  return (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.classes.shift}
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
            {
              props.intl.formatMessage(layoutMessage.tooltip.filter)
            }
          </Typography>

          {
            (props.filterCluster) &&
            <Button color="inherit" onClick={props.handleFilterOnReset}>
              {props.intl.formatMessage(layoutMessage.action.reset)}
            </Button>
          }

          <Button 
            color="inherit" 
            onClick={props.handleFilterOnApply}
            disabled={!props.filterCluster}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>
        </Toolbar>
      </AppBar>

      <Divider/>

      <List>
        <ListItem button onClick={props.handleFilterClusterVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'})}
            secondary={props.filterCluster ? props.filterCluster.name : props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCluster &&
              <IconButton onClick={props.handleFilterClusterOnClear}>
                <ClearIcon />
              </IconButton>
            }
            {
              !props.filterCluster &&
              <Tooltip title={props.intl.formatMessage(hrMessage.competency.field.clusterRequired)}>
                <IconButton onClick={props.handleFilterClusterVisibility}>
                  <Info/>
                </IconButton>
              </Tooltip>
            }
            <IconButton onClick={props.handleFilterClusterVisibility}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>

      <FilterCluster 
        title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'})}
        hideBackdrop={true}
        isOpen={props.isFilterClusterOpen}
        value={props.filterCluster && props.filterCluster.uid}
        onSelected={props.handleFilterClusterOnSelected}
        onClose={props.handleFilterClusterOnClose}        
      />
    </Dialog>
  </React.Fragment>
  );
};