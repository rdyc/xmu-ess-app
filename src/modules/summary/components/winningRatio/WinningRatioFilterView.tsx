import { InputDateWithValue } from '@layout/components/input/date';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
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
import * as React from 'react';

import { EmployeeDialog } from '@account/components/select';
import { FilterCompany } from '@lookup/components/company/select';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import { WinningRatioFilterProps } from './WinningRatioFilter';

export const WinningRatioFilterView: React.SFC<WinningRatioFilterProps> = props => {
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

        <List>

          <ListItem button onClick={props.handleFilterCompanyVisibility} disabled={props.isAdmin ? false : true}>
            <ListItemText 
              primary={props.intl.formatMessage(summaryMessage.winningRatio.field.company)}
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
              primary={props.intl.formatMessage(summaryMessage.winningRatio.field.name)}
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
              primary={props.intl.formatMessage(summaryMessage.winningRatio.field.start)}
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
              primary={props.intl.formatMessage(summaryMessage.winningRatio.field.end)}
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
          title={props.intl.formatMessage(summaryMessage.winningRatio.field.company)}
          hideBackdrop={true}
          isOpen={props.isFilterCompanyOpen}
          value={props.filterCompany && props.filterCompany.uid}
          onSelected={props.handleFilterCompanyOnSelected}
          onClose={props.handleFilterCompanyOnClose}        
        />

        <EmployeeDialog
          hideBackdrop={true}
          isOpen={props.isFilterEmployeeOpen}
          onSelected={props.handleFilterEmployeeOnSelected}
          onClose={props.handleFilterEmployeeOnClose}
        />

        <InputDateWithValue 
          label={props.intl.formatMessage(summaryMessage.winningRatio.field.start)}
          val={props.filterStart}
          onSelected={props.handleFilterStartOnSelected}
          isOpen={props.isFilterStartOpen}
          onClose={props.handleFilterStartOnClose}
          disableFuture={true}
        />

        <InputDateWithValue 
          label={props.intl.formatMessage(summaryMessage.winningRatio.field.end)}
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
    <Toolbar disableGutters>
    <Typography
      noWrap
      variant="body2"
      className={props.className}
    >
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
  );
};