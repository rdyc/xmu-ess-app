import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { isRequestEditable, isSettleReady } from '@purchase/helper';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { PurchaseSummary } from '../detail/shared/PurchaseSummary';
import { PurchaseRequestListProps } from './PurchaseRequestList';
import { PurchaseRequestListFilter } from './PurchaseRequestListFilter';

export const PurchaseRequestListView: React.SFC<PurchaseRequestListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.PurchaseRequest,
        parentUid: AppMenu.Purchase,
        title: props.intl.formatMessage(purchaseMessage.request.pages.listTitle),
        description: props.intl.formatMessage(purchaseMessage.request.pages.listSubHeader)
      }}

      // state & fields
      state={props.purchaseRequestState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: IPurchase) => (
        <PurchaseSummary data={item} />
      )}
      actionComponent={(item: IPurchase) => (
        <React.Fragment>
          { 
            item.statusType &&
            isRequestEditable(item.statusType) &&
            <Button
              size="small"
              onClick={() => props.history.push(`/purchase/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }
          { 
            item.statusType &&
            isSettleReady(item.statusType) &&
            <Button
              size="small"
              onClick={() => props.history.push(`/purchase/settlement/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button
            size="small"
            onClick={() => props.history.push(`/purchase/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="purchase.request"
          default={props.purchaseRequestState.all.request && props.purchaseRequestState.all.request.filter && props.purchaseRequestState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/purchase/requests/form')}
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
              disabled={props.purchaseRequestState.all.isLoading || props.purchaseRequestState.all.isError}
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

    <PurchaseRequestListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isSettlement: props.isSettlement
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);