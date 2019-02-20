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
import { PurchaseApprovalListProps } from './PurchaseApprovalList';
import { PurchaseApprovalListFilter } from './PurchaseApprovalListFilter';

export const PurchaseApprovalListView: React.SFC<PurchaseApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.PurchaseApproval,
        parentUid: AppMenu.Purchase,
        title: props.intl.formatMessage(purchaseMessage.approval.pages.listTitle),
        description: props.intl.formatMessage(purchaseMessage.approval.pages.listSubHeader)
      }}

      // state & fields
      state={props.purchaseApprovalState.all}
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
            onClick={() => props.history.push(`/purchase/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="purchase.approval"
          default={props.purchaseApprovalState.all.request && props.purchaseApprovalState.all.request.filter && props.purchaseApprovalState.all.request.filter.find}
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
              disabled={props.purchaseApprovalState.all.isLoading || props.purchaseApprovalState.all.isError}
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

    <PurchaseApprovalListFilter
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