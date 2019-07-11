import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { FilterCompany } from '@lookup/components/company/select';
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
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

import { ResourceMappingFilterProps } from './ResourceMappingFilter';

export const ResourceMappingFilterView: React.SFC<ResourceMappingFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.filterCompany !== undefined ||
      props.filterYear !== undefined;
  };
  const filter = () => {
    return (
    <React.Fragment>
      <Dialog
        fullScreen
        disableBackdropClick
        open={props.isFilterOpen}
        className={props.classes.shift}
        onClose={props.handleFilterVisibility}
      >
        <AppBar 
          elevation={0}
          position="fixed" 
          color="default"
          className={props.classes.appBarDialog}
        >
          <Toolbar>
            <IconButton color="inherit" onClick={props.handleFilterVisibility} aria-label="Close">
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={props.classes.flex}>
              {
                !props.isStartup &&
                props.intl.formatMessage(layoutMessage.tooltip.filter) ||
                props.intl.formatMessage(summaryMessage.mapping.page.title)
              }
            </Typography>

            {
              (props.filterCompany || props.filterYear || props.filterSummary) &&
              <Button color="inherit" onClick={props.handleFilterOnReset}>
                {props.intl.formatMessage(layoutMessage.action.reset)}
              </Button>
            }

            <Button 
              color="inherit" 
              onClick={props.handleFilterOnApply}
              disabled={(!props.filterCompany) || (!props.filterYear)}
            >
              {props.intl.formatMessage(layoutMessage.action.apply)}
            </Button>
          </Toolbar>
        </AppBar>

        <Divider/>

        <List>
          <ListItem button onClick={props.handleFilterCompanyVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.mapping.field.company)}
              secondary={props.filterCompany ? props.filterCompany.name : props.intl.formatMessage(layoutMessage.text.none)}
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

          <ListItem button onClick={props.handleFilterYearVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.mapping.field.year)}
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

          <ListItem>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.mapping.field.summary)}
              secondary={props.intl.formatMessage(props.filterRejected ? layoutMessage.action.yes : layoutMessage.action.no)}
            />
            <ListItemSecondaryAction>
              <Switch
                color="secondary"
                checked={props.filterSummary || false}
                onChange={props.handleFilterSummaryOnChange}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

        </List>

        <FilterCompany 
          title={props.intl.formatMessage(summaryMessage.mapping.field.company)}
          hideBackdrop={true}
          isOpen={props.isFilterCompanyOpen}
          value={props.filterCompany && props.filterCompany.uid}
          onSelected={props.handleFilterCompanyOnSelected}
          onClose={props.handleFilterCompanyOnClose}        
        />

        <DialogValue
          title={props.intl.formatMessage(summaryMessage.mapping.field.year)}
          isOpen={props.isFilterYearOpen}
          hideBackdrop={true}
          items={props.yearList}
          value={props.filterYear && props.filterYear.value}
          onSelected={props.handleFilterYearOnSelected}
          onClose={props.handleFilterYearOnClose}
        />
      </Dialog>
    </React.Fragment>
    );
  };

  return (
    <Paper square elevation={1}>
      <Toolbar style={{direction : 'rtl'}}>
      {/* <Typography
        noWrap
        variant="body2"
        className={props.className}
      >
      </Typography> */}

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
          onClick={props.handleFilterVisibility} 
        >
          <Badge
            invisible={!showBadgeWhen()}
            badgeContent={<CheckCircleIcon color="secondary" />}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {filter()}

    </Toolbar>
  </Paper>
  );
};