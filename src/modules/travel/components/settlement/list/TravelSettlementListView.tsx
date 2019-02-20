import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { ITravelSettlement } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSummarySettlement } from '../detail/shared/TravelSummarySettlement';
import { TravelSettlementListProps } from './TravelSettlementList';
import { TravelSettlementListFilter } from './TravelSettlementListFilter';

export const TravelSettlementListView: React.SFC<TravelSettlementListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TravelSettlementRequest,
        parentUid: AppMenu.Travel,
        title: props.intl.formatMessage(travelMessage.settlement.page.listTitle),
        description: props.intl.formatMessage(travelMessage.settlement.page.listSubHeader),
      }}

      // state & fields
      state={props.travelSettlementState.all}
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
          {
            isRequestEditable(item.statusType) &&
            <Button
              size="small"
              onClick={() => props.history.push(`/travel/settlement/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button
            size="small"
            onClick={() => props.history.push(`/travel/settlement/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="travel.settlement"
          default={props.travelSettlementState.all.request && props.travelSettlementState.all.request.filter && props.travelSettlementState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/travel/settlement/requests/form')}
        >
          <AddCircle />
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
              disabled={props.travelSettlementState.all.isLoading || props.travelSettlementState.all.isError}
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

    <TravelSettlementListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);