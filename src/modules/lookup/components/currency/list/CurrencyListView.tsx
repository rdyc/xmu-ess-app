import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ICurrency } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { CurrencySummary } from '../detail/shared/CurrencySummary';
import { CurrencyListProps } from './CurrencyList';

export const CurrencyListView: React.SFC<CurrencyListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupCurrency,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.currency.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.currency.page.listSubHeader)
      }}

      // state & fields
      state={props.lookupCurrencyState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: ICurrency) => (
        <CurrencySummary data={item} />
      )}
      actionComponent={(item: ICurrency) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/currencies/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>
          
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/currencies/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.currency"
          default={props.lookupCurrencyState.all.request && props.lookupCurrencyState.all.request.filter && props.lookupCurrencyState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/currencies/form')}
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
            {/* <IconButton
              id="option-filter"
              disabled={props.lookupCurrencyState.all.isLoading || props.lookupCurrencyState.all.isError}
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
            </IconButton> */}
          </div>
        </Tooltip>
      }
    />

    {/* <PurchaseRequestListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isSettlement: props.isSettlement
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    /> */}
  </React.Fragment>
);