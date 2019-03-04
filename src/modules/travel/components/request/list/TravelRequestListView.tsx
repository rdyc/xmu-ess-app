import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isModuleRequestEditable } from '@organization/helper';
import { ITravelRequest } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSummary } from '../detail/shared/TravelSummary';
import { TravelRequestListProps } from './TravelRequestList';
import { TravelRequestListFilter } from './TravelRequestListFilter';

export const TravelRequestListView: React.SFC<TravelRequestListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.TravelRequest,
        parentUid: AppMenu.Travel,
        title: props.intl.formatMessage(travelMessage.request.page.listTitle),
        description: props.intl.formatMessage(travelMessage.request.page.listSubHeader)
      }}

      // state & fields
      state={props.travelRequestState.all}
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
          {
            isModuleRequestEditable(item.statusType) &&
            <Button
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/travel/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/travel/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="travel.request"
          default={props.travelRequestState.all.request && props.travelRequestState.all.request.filter && props.travelRequestState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/travel/requests/form')}
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
              disabled={props.travelRequestState.all.isLoading || props.travelRequestState.all.isError}
              onClick={props.handleFilterVisibility}
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune />
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <TravelRequestListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
        isSettlement: props.isSettlement
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);