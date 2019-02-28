import { AccountEmployeeDialog } from '@account/components/dialog';
import { InputDateWithValue } from '@layout/components/input/date';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
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

import { BillableListFilterProps } from './BillableListFilter';

export const BillableListFilterView: React.SFC<BillableListFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.filterCompany !== undefined ||
      props.filterEmployee !== undefined ||
      props.filterStart !== undefined ||
      props.filterEnd !== undefined;
  };

  const filter = () => {
    return (
    <React.Fragment>
      <Dialog
        fullScreen
        disableBackdropClick
        open={props.isFilterOpen}
        className={props.theme.direction === 'rtl' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
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
              {props.intl.formatMessage(layoutMessage.tooltip.filter)}
            </Typography>

            {
              (props.filterCompany || props.filterEmployee || props.filterStart || props.filterEnd) &&
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
          <ListItem button onClick={props.handleFilterCompanyVisibility} disabled={props.isAdmin ? false : true}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.billable.field.company)}
              secondary={props.isAdmin ? props.filterCompany && props.filterCompany.name : props.filterNonAdmin || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                props.filterCompany &&
                <IconButton onClick={props.handleFilterCompanyOnClear}>
                  <ClearIcon />
                </IconButton>
              }

              <IconButton onClick={props.handleFilterCompanyVisibility} disabled={props.isAdmin ? false : true}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem button onClick={props.handleFilterEmployeeVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.billable.field.name)}
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

          <ListItem button onClick={props.handleFilterStartVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.billable.field.start)}
              secondary={props.filterStart && props.intl.formatDate(props.filterStart, GlobalFormat.Date) || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                props.filterStart &&
                <IconButton onClick={props.handleFilterStartOnClear}>
                  <ClearIcon />
                </IconButton>
              }

              <IconButton onClick={props.handleFilterStartVisibility}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem button onClick={props.handleFilterEndVisibility}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.billable.field.end)}
              secondary={props.filterEnd && props.intl.formatDate(props.filterEnd, GlobalFormat.Date) || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                props.filterEnd &&
                <IconButton onClick={props.handleFilterEndOnClear}>
                  <ClearIcon />
                </IconButton>
              }

              <IconButton onClick={props.handleFilterEndVisibility}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

        </List>

        <FilterCompany 
          title={props.intl.formatMessage(summaryMessage.billable.field.company)}
          hideBackdrop={true}
          isOpen={props.isFilterCompanyOpen}
          value={props.filterCompany && props.filterCompany.uid}
          onSelected={props.handleFilterCompanyOnSelected}
          onClose={props.handleFilterCompanyOnClose}        
        />

        <AccountEmployeeDialog
          isOpen={props.isFilterEmployeeOpen}
          title={props.intl.formatMessage(summaryMessage.billable.field.name)}
          value={props.filterEmployee && props.filterEmployee.uid}
          filter={{
            companyUids: props.userState.user && props.userState.user.company.uid,
            orderBy: 'fullName',
            direction: 'ascending'
          }}
          hideBackdrop={true}
          onSelected={props.handleFilterEmployeeOnSelected}
          onClose={props.handleFilterEmployeeOnClose}
        />

        <InputDateWithValue 
          label={props.intl.formatMessage(summaryMessage.billable.field.start)}
          val={props.filterStart}
          onSelected={props.handleFilterStartOnSelected}
          isOpen={props.isFilterStartOpen}
          onClose={props.handleFilterStartOnClose}
          disableFuture={true}
        />

        <InputDateWithValue 
          label={props.intl.formatMessage(summaryMessage.billable.field.end)}
          val={props.filterEnd}
          onSelected={props.handleFilterEndOnSelected}
          isOpen={props.isFilterEndOpen}
          onClose={props.handleFilterEndOnClose}
          disableFuture={true}
        />
      </Dialog>
    </React.Fragment>
    );
  };

  return (
    <Paper square>
      <Toolbar>
        <Typography
          noWrap
          variant="body2"
          className={props.classes.flex}
        >
          {
            props.isLoading &&
            props.intl.formatMessage(layoutMessage.text.loading)
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

        {filter()}

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
    </Paper>
  );
};