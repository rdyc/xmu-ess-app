import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { isSettlementEditable } from '@purchase/helper';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { SettlementSummary } from '../detail/shared/SettlementSummary';
import { PurchaseSettlementListProps } from './PurchaseSettlementList';
import { PurchaseSettlementListFilter } from './PurchaseSettlementListFilter';

export const PurchaseSettlementListView: React.SFC<PurchaseSettlementListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info= {{
        uid: AppMenu.PurchaseSettlementRequest,
        parentUid: AppMenu.Purchase,
        title: props.intl.formatMessage(purchaseMessage.settlement.pages.listTitle),
        description: props.intl.formatMessage(purchaseMessage.settlement.pages.listSubHeader)
      }}

    // state & fields
    state = { props.purchaseSettlementState.all }
    fields = { props.fields }

    // callback
    onLoadApi = { props.handleOnLoadApi }
    onBind = { props.handleOnBind }

    // row components
    summaryComponent = {(item: ISettlement) => (
      <SettlementSummary data= { item } />
    )}
    actionComponent = {(item: ISettlement) => (
      <React.Fragment>
        {
          item.statusType &&
          isSettlementEditable(item.statusType) &&
          <Button
            size="small"
            color="secondary"
            onClick = {() => props.history.push(`/purchase/settlement/requests/form`, { uid: item.uid }) }
          >
            { props.intl.formatMessage(layoutMessage.action.modify) }
          </Button >
        }

        <Button
          size="small"
          color="secondary"
          onClick = {() => props.history.push(`/purchase/settlement/requests/${item.uid}`)}
        >
          { props.intl.formatMessage(layoutMessage.action.details) }
        </Button >
      </React.Fragment >
    )}

  // app bar component
    appBarSearchComponent = {
      <SearchBox
        key = "purchase.settlement.request"
        default={ props.purchaseSettlementState.all.request && props.purchaseSettlementState.all.request.filter && props.purchaseSettlementState.all.request.filter.find }
        fields = { props.fields }
        onApply = { props.handleOnLoadApiSearch }
      />
    }
    
    appBarCustomComponent = {
      <IconButton
        color="inherit"
        onClick = {() => props.history.push('/purchase/settlement/requests/form')}
      >
        <AddCircle />
      </IconButton >
    }

  // data toolbar component
    toolbarDataComponent = {
    <Tooltip
      placement = "bottom"
      title = { props.intl.formatMessage(layoutMessage.tooltip.filter) }
    >
      <div>
      <IconButton
      id="option-filter"
      disabled = { props.purchaseSettlementState.all.isLoading || props.purchaseSettlementState.all.isError }
      onClick = { props.handleFilterVisibility }
      >
      <Badge
      invisible={ !props.handleFilterBadge() }
      badgeContent = {
        < CheckCircle color = "primary" fontSize = "small" />
        }
        >
          <Tune />
          </Badge>
          </IconButton>
          </div>
        </Tooltip>
      }
    />

    <PurchaseSettlementListFilter
      isOpen = { props.isFilterOpen }
      initialProps = {{
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
        status: props.status,
      }}
      onClose = { props.handleFilterVisibility }
      onApply = { props.handleFilterApplied }
    />
  </React.Fragment>
);