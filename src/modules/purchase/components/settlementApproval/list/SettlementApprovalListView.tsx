import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { SettlementApprovalListProps } from './SettlementApprovalList';
import { SettlementApprovalListFilter } from './SettlementApprovalListFilter';

export const SettlementApprovalListView: React.SFC<SettlementApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.PurchaseSettlementApproval,
        parentUid: AppMenu.Purchase,
        title: props.intl.formatMessage(purchaseMessage.s_approval.pages.listTitle),
        description: props.intl.formatMessage(purchaseMessage.s_approval.pages.listSubHeader)
      }}

      // state & fields
      state={props.settlementApprovalState.all}
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
        <React.Fragment><Button
          size="small"
          onClick={() => props.history.push(`/purchase/settlement/approvals/${item.uid}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="purchase.settlement.approval"
          default={props.settlementApprovalState.all.request && props.settlementApprovalState.all.request.filter && props.settlementApprovalState.all.request.filter.find}
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
              disabled={props.settlementApprovalState.all.isLoading || props.settlementApprovalState.all.isError}
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

    <SettlementApprovalListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        isNotify: props.isNotify,
        status: props.status
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);