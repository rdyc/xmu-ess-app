import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
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
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/SettingsBackupRestore';
import * as React from 'react';

import { FilterCompany } from '@lookup/components/company/select';
import { FilterPosition } from '@lookup/components/position/select';
import { KPITemplateListFilterProps } from './KPITemplateListFilter';

export const KPITemplateListFilterView: React.SFC<KPITemplateListFilterProps> = props => (
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
            (props.filterCompany || props.filterPosition) &&
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
        <ListItem button onClick={props.handleFilterCompanyVisibility}>
          <ListItemText 
            primary={props.intl.formatMessage(kpiMessage.template.field.company)}
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
            primary={props.intl.formatMessage(kpiMessage.template.field.position)}
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

      <FilterCompany 
        title={props.intl.formatMessage(kpiMessage.template.field.company)}
        hideBackdrop={true}
        isOpen={props.isFilterCompanyOpen}
        value={props.filterCompany && props.filterCompany.uid}
        onSelected={props.handleFilterCompanyOnSelected}
        onClose={props.handleFilterCompanyOnClose}        
      />

      <FilterPosition
        title={props.intl.formatMessage(kpiMessage.template.field.position)}
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