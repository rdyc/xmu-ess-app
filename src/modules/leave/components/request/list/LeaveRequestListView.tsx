import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ILeave } from '@leave/classes/response';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isLeaveRequestEditable } from '@organization/helper';
import * as React from 'react';

import { LeaveSummary } from '../detail/shared/LeaveSummary';
import { LeaveRequestListProps } from './LeaveRequestList';
import { LeaveRequestListFilter } from './LeaveRequestListFilter';

export const LeaveRequestListView: React.SFC<LeaveRequestListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LeaveRequest,
        parentUid: AppMenu.Leave,
        title: props.intl.formatMessage(leaveMessage.request.page.listTitle),
        description: props.intl.formatMessage(leaveMessage.request.page.listSubHeader)
      }}

      // state & fields
      state={props.leaveRequestState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ILeave) => ( 
        <LeaveSummary data={item} />
      )}
      actionComponent={(item: ILeave) => (
        <React.Fragment>
          {
            isLeaveRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => props.history.push(`/leave/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/leave/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="leave.request"
          default={props.leaveRequestState.all.request && props.leaveRequestState.all.request.filter && props.leaveRequestState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/leave/requests/form')}
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
              disabled={props.leaveRequestState.all.isLoading || props.leaveRequestState.all.isError}
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

    <LeaveRequestListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        leaveType: props.leaveType,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);