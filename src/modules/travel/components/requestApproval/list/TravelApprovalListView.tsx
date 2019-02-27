import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { ITravelRequest } from '@travel/classes/response';
import { TravelSummary } from '@travel/components/request/detail/shared/TravelSummary';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelApprovalListProps } from './TravelApprovalList';
import { TravelApprovalListFilter } from './TravelApprovalListFilter';

export const TravelApprovalListView: React.SFC<TravelApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TravelApproval,
        parentUid: AppMenu.Travel,
        title: props.intl.formatMessage(travelMessage.requestApproval.page.listTitle),
        description: props.intl.formatMessage(travelMessage.requestApproval.page.listSubHeader),
      }}

      // state & fields
      state={props.travelApprovalState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: ITravelRequest) => (
        <TravelSummary data={item} />
      )}
      actionComponent={(item: ITravelRequest) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => props.history.push(`/travel/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="travel.approval"
          default={props.travelApprovalState.all.request && props.travelApprovalState.all.request.filter && props.travelApprovalState.all.request.filter.find}
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
              disabled={props.travelApprovalState.all.isLoading || props.travelApprovalState.all.isError}
              onClick={props.handleFilterVisibility}
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="primary" fontSize="small" />
                }
              >
                <Tune />
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <TravelApprovalListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);