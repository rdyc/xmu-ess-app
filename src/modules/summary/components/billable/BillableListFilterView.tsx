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
import { Info } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { BillableListFilterProps } from './BillableListFilter';

export const BillableListFilterView: React.SFC<BillableListFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.filterCompany && props.filterCompany.uid !== ( props.resetCompany && props.resetCompany.uid ) ||
    isNullOrUndefined(props.filterCompany) ||
      props.filterEmployee !== undefined ||
      props.filterStart !== props.start ||
      props.filterEnd !== props.end;
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
              {props.intl.formatMessage(layoutMessage.tooltip.filter)}
            </Typography>

            {
              (props.filterCompany && props.filterCompany.uid !== ( props.resetCompany && props.resetCompany.uid ) ||
              isNullOrUndefined(props.filterCompany) ||
              props.filterEmployee ||
              props.filterStart !== props.start ||          
              props.filterEnd !== props.end) &&
              <Button color="inherit" onClick={props.handleFilterOnReset}>
                {props.intl.formatMessage(layoutMessage.action.reset)}
              </Button>
            }

            <Button 
              color="inherit" 
              onClick={props.handleFilterOnApply}
              disabled={(!props.filterCompany) || (!props.filterStart) || (!props.filterEnd)}
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
              secondary={props.isAdmin ? (props.filterCompany ? props.filterCompany.name : props.intl.formatMessage(layoutMessage.text.none)) : props.filterCompanyNonAdmin || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                (props.filterCompany && props.filterCompany.uid !== (props.resetCompany && props.resetCompany.uid) || isNullOrUndefined(props.filterCompany)) &&
                <IconButton onClick={props.handleFilterCompanyOnClear}>
                  <ClearIcon />
                </IconButton>
              }
              {
                !props.filterCompany &&
                <Tooltip title={props.intl.formatMessage(summaryMessage.billable.field.companyRequired)}>
                  <IconButton onClick={props.handleFilterCompanyVisibility}>
                    <Info/>
                  </IconButton>
                </Tooltip>
              }
              <IconButton onClick={props.handleFilterCompanyVisibility} disabled={props.isAdmin ? false : true}>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem button onClick={props.handleFilterEmployeeVisibility} disabled={props.isAdmin ? (props.filterCompany ? false : true ) : false }>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.billable.field.name)}
              secondary={props.filterEmployee && props.filterEmployee.fullName || props.intl.formatMessage(layoutMessage.text.none)}
            />
            <ListItemSecondaryAction>
              {
                (props.isAdmin ? (props.filterCompany && props.filterEmployee) : props.filterEmployee) &&
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
                props.filterStart !== props.start &&
                <IconButton onClick={props.handleFilterStartOnClear}>
                  <ClearIcon />
                </IconButton>
              }
              {
                props.filterEnd && !props.filterStart &&
                <Tooltip title={props.intl.formatMessage(summaryMessage.billable.field.startRequired)}>
                  <IconButton onClick={props.handleFilterStartVisibility}>
                    <Info/>
                  </IconButton>
                </Tooltip>
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
                props.filterEnd !== props.end &&
                <IconButton onClick={props.handleFilterEndOnClear}>
                  <ClearIcon />
                </IconButton>
              }
              {
                props.filterStart && !props.filterEnd &&
                <Tooltip title={props.intl.formatMessage(summaryMessage.billable.field.endRequired)}>
                  <IconButton onClick={props.handleFilterEndVisibility}>
                    <Info/>
                  </IconButton>
                </Tooltip>
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
          filter={props.isAdmin ? props.filterEmployeeList : {
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
    <Paper square elevation={1}>
      <Toolbar style={{direction : 'rtl'}}>
        {/* <Typography
          noWrap
          variant="body2"
          className={props.classes.flex}
        >
          {
            props.isLoading &&
            props.intl.formatMessage(layoutMessage.text.loading)
          }
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