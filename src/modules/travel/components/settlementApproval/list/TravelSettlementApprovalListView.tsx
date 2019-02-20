import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelSummarySettlement } from '@travel/components/settlement/detail/shared/TravelSummarySettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementApprovalListProps } from './TravelSettlementApprovalList';
import { TravelSettlementApprovalListFilter } from './TravelSettlementApprovalListFilter';

export const TravelSettlementApprovalListView: React.SFC<TravelSettlementApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TravelSettlementApproval,
        parentUid: AppMenu.Travel,
        title: props.intl.formatMessage(travelMessage.settlementApproval.page.listTitle),
        description: props.intl.formatMessage(travelMessage.settlementApproval.page.listSubHeader),
      }}

      // state & fields
      state={props.travelSettlementApprovalState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: ITravelSettlement) => (
        <TravelSummarySettlement data={item} />
      )}
      actionComponent={(item: ITravelSettlement) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => props.history.push(`/travel/settlement/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="travel.settlement.approval"
          default={props.travelSettlementApprovalState.all.request && props.travelSettlementApprovalState.all.request.filter && props.travelSettlementApprovalState.all.request.filter.find}
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
              disabled={props.travelSettlementApprovalState.all.isLoading || props.travelSettlementApprovalState.all.isError}
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

    <TravelSettlementApprovalListFilter
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