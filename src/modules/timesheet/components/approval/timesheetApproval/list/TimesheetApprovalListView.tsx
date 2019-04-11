import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntrySumarry } from '@timesheet/components/entry/detail/shared/TimesheetEntrySummary';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';

import { TimesheetApprovalListProps } from './TimesheetApprovalList';
import { TimesheetApprovalListFilter } from './TimesheetApprovalListFilter';

export const TimesheetApprovalListView: React.SFC<TimesheetApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TimesheetApproval,
        parentUid: AppMenu.Timesheet,
        title: props.intl.formatMessage(timesheetMessage.approval.page.listTitle),
        description: props.intl.formatMessage(timesheetMessage.approval.page.listSubHeader),
      }}

      // state & fields
      state={props.timesheetApprovalState.all}
      fields={props.fields}

      // selection
      onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ITimesheet) => ( 
        <TimesheetEntrySumarry data={item} />
      )}
      actionComponent={(item: ITimesheet) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/timesheet/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="timesheet.approval"
          default={props.timesheetApprovalState.all.request && props.timesheetApprovalState.all.request.filter && props.timesheetApprovalState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
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
              disabled={props.timesheetApprovalState.all.isLoading || props.timesheetApprovalState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <TimesheetApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        employeeUid: props.employeeUid,
        customerUid: props.customerUid,
        activityType: props.activityType,
        statusType: props.statusType,
        status: props.status,
        start: props.start,
        end: props.end,
        isNotify: props.isNotify
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);