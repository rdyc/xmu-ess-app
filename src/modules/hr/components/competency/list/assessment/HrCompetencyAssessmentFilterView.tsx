import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogValue } from '@layout/components/dialogs/DialogValue';
import { layoutMessage } from '@layout/locales/messages';
import { FilterCompany } from '@lookup/components/company/select';
import { FilterPosition } from '@lookup/components/position/select';
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

import { HrCompetencyAssessmentFilterProps } from './HrCompetencyAssessmentFilter';

export const HrCompetencyAssessmentFilterView: React.SFC<HrCompetencyAssessmentFilterProps> = props => (
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
            (props.filterCompany || props.filterPosition || props.filterYear) &&
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

        <ListItem button onClick={props.handleFilterYearVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.year)}
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

        <ListItem button onClick={props.handleFilterPositionVisibility} disabled={props.filterPositionValue && props.filterCompany ? false : true}>
          <ListItemText 
            primary={props.intl.formatMessage(hrMessage.competency.field.position)}
            secondary={props.filterCompany && props.filterPosition && props.filterPosition.name || props.intl.formatMessage(layoutMessage.text.none)}
          />
          <ListItemSecondaryAction>
            {
              props.filterCompany && props.filterPosition &&
              <IconButton onClick={props.handleFilterPositionOnClear}>
                <ClearIcon />
              </IconButton>
            }

            <IconButton onClick={props.handleFilterPositionVisibility} disabled={props.filterPositionValue && props.filterCompany ? false : true}>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

      </List>

      <DialogValue
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

      <FilterPosition
        title={props.intl.formatMessage(hrMessage.competency.field.position)}
        hideBackdrop={true}
        isOpen={props.isFilterPositionOpen}
        value={props.filterPosition && props.filterPosition.uid}
        onSelected={props.handleFilterPositionOnSelected}
        onClose={props.handleFilterPositionOnClose}
        filter={props.filterPositionValue}
      />
    </Dialog>
  </React.Fragment>
);