import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ILeave } from '@leave/classes/response';
import { LeaveSummary } from '@leave/components/request/detail/shared/LeaveSummary';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { LeaveApprovalListProps } from './LeaveApprovalList';
import { LeaveApprovalListFilter } from './LeaveApprovalListFilter';

export const LeaveApprovalListView: React.SFC<LeaveApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LeaveApproval,
        parentUid: AppMenu.Leave,
        title: props.intl.formatMessage(leaveMessage.approval.page.listTitle),
        description: props.intl.formatMessage(leaveMessage.approval.page.listSubHeader),
      }}

      // state & fields
      state={props.leaveApprovalState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ILeave) => ( 
        <LeaveSummary data={item} />
      )}
      actionComponent={(item: ILeave) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/leave/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="leave.approval"
          default={props.leaveApprovalState.all.request && props.leaveApprovalState.all.request.filter && props.leaveApprovalState.all.request.filter.find}
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
              disabled={props.leaveApprovalState.all.isLoading || props.leaveApprovalState.all.isError}
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

    <LeaveApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        leaveType: props.leaveType,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);