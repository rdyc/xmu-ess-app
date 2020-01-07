import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { FilterCompany } from '@lookup/components/company/select';
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
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';

import { EmployeeCompetencyFilterProps } from './EmployeeCompetencyFilter';

export const EmployeeCompetencyFilterView: React.SFC<EmployeeCompetencyFilterProps> = props => (
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
            (props.filterCompany || !props.filterYear || (props.filterYear && props.filterYear.value !== props.currentYear.value) || props.filterAssess || !props.filterActive) &&
            <Button color="inherit" onClick={props.handleFilterOnReset}>
              {props.intl.formatMessage(layoutMessage.action.reset)}
            </Button>
          }

          <Button 
            color="inherit" 
            onClick={props.handleFilterOnApply}
            disabled={!props.filterYear}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>

        </Toolbar>
      </AppBar>

      <Divider/>

      <List>

        <ListItem button onClick={props.handleFilterYearVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.year)}
            secondary={props.filterYear && props.filterYear.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              (!props.filterYear ||
              props.filterYear &&
              props.filterYear.value !== props.currentYear.value) &&
              <IconButton onClick={props.handleFilterYearOnClear}>
                <ClearIcon />
              </IconButton>
            }
            {
              !props.filterYear &&
              <Tooltip title={props.intl.formatMessage(hrMessage.competency.field.yearRequired)}>
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
            primary={props.intl.formatMessage(hrMessage.competency.field.company)}
            secondary={props.filterCompany && props.filterCompany.name || props.intl.formatMessage(layoutMessage.text.none)}
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

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.assess)}
            secondary={props.intl.formatMessage(props.filterAssess ? layoutMessage.action.yes : layoutMessage.action.no) }
          />
          <ListItemSecondaryAction>
            <Switch
              color="secondary"
              checked={props.filterAssess || false}
              onChange={props.handleFilterAssessOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.active)}
            secondary={props.intl.formatMessage(props.filterActive ? layoutMessage.action.yes : layoutMessage.action.no) }
          />
          <ListItemSecondaryAction>
            <Switch
              color="secondary"
              checked={props.filterActive}
              onChange={props.handleFilterActiveOnChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>

      <DialogValue
        withoutNone
        title={props.intl.formatMessage(hrMessage.competency.field.year)}
        isOpen={props.isFilterYearOpen}
        hideBackdrop={true}
        items={props.yearList}
        value={props.filterYear && props.filterYear.value}
        onSelected={props.handleFilterYearOnSelected}
        onClose={props.handleFilterYearOnClose}
      />

      <FilterCompany 
        title={props.intl.formatMessage(hrMessage.competency.field.company)}
        hideBackdrop={true}
        isOpen={props.isFilterCompanyOpen}
        value={props.filterCompany && props.filterCompany.uid}
        onSelected={props.handleFilterCompanyOnSelected}
        onClose={props.handleFilterCompanyOnClose}        
      />
    </Dialog>
  </React.Fragment>
);