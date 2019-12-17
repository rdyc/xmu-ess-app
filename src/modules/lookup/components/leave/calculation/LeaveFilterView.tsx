import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { FilterCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import {
  AppBar,
  Badge,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import * as React from 'react';

import { LeaveFilterProps } from './LeaveFilter';

export const LeaveFilterView: React.SFC<LeaveFilterProps> = props => {

  const showBadgeWhen = (): boolean => {
    return props.filterCompany && props.filterCompany.uid || props.filterYear && props.filterYear.value;
  };

  const filter = (
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
              {props.intl.formatMessage(layoutMessage.tooltip.filter)}
            </Typography>

            {
              (props.filterCompany || props.filterYear) &&
              <Button color="inherit" onClick={props.handleFilterOnReset}>
                {props.intl.formatMessage(layoutMessage.action.reset)}
              </Button>
            }

            <Button 
              color="inherit" 
              onClick={props.handleFilterOnApply}
              disabled={!props.filterCompany || !props.filterYear}
            >
              {props.intl.formatMessage(layoutMessage.action.apply)}
            </Button>

          </Toolbar>
        </AppBar>

        <Divider/>

        <List>

          <ListItem button onClick={props.handleFilterYearVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(lookupMessage.calculation.filter.year)}
              secondary={props.filterYear && props.filterYear.name || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                props.filterYear &&
                <IconButton onClick={props.handleFilterYearOnClear}>
                  <ClearIcon />
                </IconButton>
              }
              {
                !props.filterYear &&
                <Tooltip title={props.intl.formatMessage(lookupMessage.calculation.filter.yearRequired)}>
                  <IconButton onClick={props.handleFilterYearVisibility}>
                    <Info/>
                  </IconButton>
                </Tooltip>
              }

              <IconButton onClick={props.handleFilterYearVisibility}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem button onClick={props.handleFilterCompanyVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(lookupMessage.calculation.filter.company)}
              secondary={props.filterCompany && props.filterCompany.name || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                props.filterCompany &&
                <IconButton onClick={props.handleFilterCompanyOnClear}>
                  <ClearIcon />
                </IconButton>
              }
              {
                !props.filterCompany &&
                <Tooltip title={props.intl.formatMessage(lookupMessage.calculation.filter.company)}>
                  <IconButton onClick={props.handleFilterCompanyVisibility}>
                    <Info/>
                  </IconButton>
                </Tooltip>
              }

              <IconButton onClick={props.handleFilterCompanyVisibility}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

        </List>

        <DialogValue
          title={props.intl.formatMessage(lookupMessage.calculation.filter.year)}
          isOpen={props.isFilterYearOpen}
          hideBackdrop={true}
          items={props.yearList}
          value={props.filterYear && props.filterYear.value}
          onSelected={props.handleFilterYearOnSelected}
          onClose={props.handleFilterYearOnClose}
        />

        <FilterCompany 
          title={props.intl.formatMessage(lookupMessage.calculation.filter.company)}
          hideBackdrop={true}
          isOpen={props.isFilterCompanyOpen}
          value={props.filterCompany && props.filterCompany.uid}
          onSelected={props.handleFilterCompanyOnSelected}
          onClose={props.handleFilterCompanyOnClose}        
        />
      </Dialog>
    </React.Fragment>
  );

  return (
    <Paper square elevation={1}>
      <Toolbar style={{direction : 'rtl'}}>
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

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
        >
          <IconButton
            disabled={props.isLoading}
            onClick={props.onClose} 
          >
            <Badge
              invisible={!showBadgeWhen()}
              badgeContent={<CheckCircleIcon color="secondary" />}
            >
              <TuneIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {filter}
      </Toolbar>
    </Paper>
  );
};