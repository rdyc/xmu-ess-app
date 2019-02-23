import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isTimesheetEditable } from '@organization/helper';
import { ITimesheet } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetEntrySumarry } from '../detail/shared/TimesheetEntrySummary';
import { TimesheetEntryListProps } from './TimesheetEntryList';
import { TimesheetEntryListFilter } from './TimesheetEntryListFilter';

export const TimesheetEntryListView: React.SFC<TimesheetEntryListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TimesheetRequest,
        parentUid: AppMenu.Timesheet,
        title: props.intl.formatMessage(timesheetMessage.entry.page.listTitle),
        description: props.intl.formatMessage(timesheetMessage.entry.page.listSubHeader)
      }}

      // state & fields
      state={props.timesheetEntryState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ITimesheet) => ( 
        <TimesheetEntrySumarry data={item} />
      )}
      actionComponent={(item: ITimesheet) => (
        <React.Fragment>
          {
            isTimesheetEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => props.history.push(`/timesheet/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/timesheet/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="timesheet.entry"
          default={props.timesheetEntryState.all.request && props.timesheetEntryState.all.request.filter && props.timesheetEntryState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/timesheet/entrys/form')}
        >
          <AddCircle/>
        </IconButton>
      }

      // data toolbar component
      toolbarDataComponent={
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
        >
          <div>
            <IconButton
              id="option-filter"
              disabled={props.timesheetEntryState.all.isLoading || props.timesheetEntryState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="primary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <TimesheetEntryListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        activityType: props.activityType,
        statusType: props.statusType,
        isRejected: props.isRejected,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);