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

import { TimesheetApprovalHistoryListProps } from './TimesheetApprovalHistoryList';
import { TimesheetApprovalHistoryListFilter } from './TimesheetApprovalHistoryListFilter';

export const TimesheetApprovalHistoryListView: React.SFC<TimesheetApprovalHistoryListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TimesheetApprovalHistory,
        parentUid: AppMenu.Timesheet,
        title: props.intl.formatMessage(timesheetMessage.approval.page2.listTitle),
        description: props.intl.formatMessage(timesheetMessage.approval.page2.listSubHeader),
      }}

      // state & fields
      state={props.timesheetApprovalHistoryState.all}
      fields={props.fields}
      
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
            onClick={() => props.history.push(`/timesheet/approvals/history/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="timesheet.approval.history"
          default={props.timesheetApprovalHistoryState.all.request && props.timesheetApprovalHistoryState.all.request.filter && props.timesheetApprovalHistoryState.all.request.filter.find}
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
              disabled={props.timesheetApprovalHistoryState.all.isLoading || props.timesheetApprovalHistoryState.all.isError}
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

    <TimesheetApprovalHistoryListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        activityType: props.activityType,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);