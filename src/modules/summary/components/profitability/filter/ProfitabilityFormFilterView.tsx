import { layoutMessage } from '@layout/locales/messages';
import { LookupCustomerDialog } from '@lookup/components/customer/dialog';
import {
  AppBar,
  Badge,
  Button,
  Dialog,
  DialogContent,
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
import { ProjectRegistrationDialog } from '@project/components/dialog/project';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SummaryProfitabilityFilterProps } from './ProfitabilityFormFilter';

export const ProfitabilityFormFilterView: React.SFC<SummaryProfitabilityFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.filterCustomer !== undefined ||
      props.filterProject !== undefined;
  };

  const filterDialog = () => {
    return (
      <React.Fragment>
        <Dialog
          fullScreen
          disableBackdropClick
          open={props.isFilterDialogOpen}
          className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
          onClose={props.handleFilterVisibility}
          scroll="paper"
        >
          <AppBar position="fixed" className={props.classes.appBarDialog}>
            <Toolbar>
              <IconButton color="inherit" onClick={props.handleFilterVisibility} aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" className={props.classes.flex}>
                {
                  !props.isStartup &&
                  props.intl.formatMessage(layoutMessage.tooltip.filter) ||
                  props.intl.formatMessage(summaryMessage.profitability.page.title)
                }
              </Typography>

              {
                (props.filterCustomer || props.filterProject) &&
                <Button color="inherit" onClick={props.handleFilterOnReset}>
                  {props.intl.formatMessage(layoutMessage.action.reset)}
                </Button>
              }

              {
                (props.filterCustomer && props.filterProject) &&
                <Button
                  color="inherit"
                  onClick={props.handleFilterOnApply}
                >
                  {props.intl.formatMessage(layoutMessage.action.apply)}
                </Button>
              }
            </Toolbar>
          </AppBar>

          <DialogContent className={props.classes.paddingDisabled}>
            <List>
              <ListItem button onClick={props.handleFilterCustomerVisibility}>
                <ListItemText
                  primary={props.intl.formatMessage(summaryMessage.filter.customerUid)}
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

                  <IconButton onClick={props.filterCustomer && props.handleFilterProjectVisibility}>
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </List>
          </DialogContent>
        </Dialog>

        <LookupCustomerDialog
          isOpen={props.isFilterCustomerOpen}
          value={props.filterCustomer && props.filterCustomer.uid}
          filter={{
            companyUid: props.userState.user && props.userState.user.company.uid,
            orderBy: 'name',
            direction: 'ascending'
          }}
          hideBackdrop={true}
          onSelected={props.handleFilterCustomerOnSelected}
          onClose={props.handleFilterCustomerOnClose}
        />

        <ProjectRegistrationDialog
          title={props.intl.formatMessage(summaryMessage.filter.projectUid)}
          isOpen={props.isFilterProjectOpen}
          filter={props.filterProjectDialog}
          hideBackdrop={true}
          onSelected={props.handleFilterProjectOnSelected}
          onClose={props.handleFilterProjectOnClose}
        />
      </React.Fragment>
    );
  };

  return (
    <Toolbar>
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