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

import { LeaveCancellationListProps } from './LeaveCancellationList';
import { LeaveCancellationListFilter } from './LeaveCancellationListFilter';

export const LeaveCancellationListView: React.SFC<LeaveCancellationListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LeaveCancelation,
        parentUid: AppMenu.Leave,
        title: props.intl.formatMessage(leaveMessage.cancellation.page.listTitle),
        description: props.intl.formatMessage(leaveMessage.cancellation.page.listSubHeader),
      }}

      // state & fields
      state={props.leaveCancellationState.all}
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
            onClick={() => props.history.push(`/leave/cancellations/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="leave.cancellation"
          default={props.leaveCancellationState.all.request && props.leaveCancellationState.all.request.filter && props.leaveCancellationState.all.request.filter.find}
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
              disabled={props.leaveCancellationState.all.isLoading || props.leaveCancellationState.all.isError}
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

    <LeaveCancellationListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        employeeUid: props.employeeUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);