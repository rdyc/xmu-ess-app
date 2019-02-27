import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomer } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { LookupCustomerSummary } from '../detail/shared/LookupCustomerSummary';
import { LookupCustomerListProps } from './LookupCustomerList';
import { LookupCustomerListFilter } from './LookupCustomerListFilter';

export const LookupCustomerListView: React.SFC<LookupCustomerListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupCustomer,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.customer.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.customer.page.listSubHeader)
      }}

      // state & fields
      state={props.lookupCustomerState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: ICustomer) => (
        <LookupCustomerSummary data={item} />
      )}
      actionComponent={(item: ICustomer) => (
        <React.Fragment>
          {
            <Button
              size="small"
              onClick={() => props.history.push(`/lookup/customers/form`, { uid: item.uid, companyUid: item.companyUid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button
            size="small"
            onClick={() => props.history.push(`/lookup/customers/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.customer"
          default={props.lookupCustomerState.all.request && props.lookupCustomerState.all.request.filter && props.lookupCustomerState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/customers/form')}
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
              disabled={props.lookupCustomerState.all.isLoading || props.lookupCustomerState.all.isError}
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

    <LookupCustomerListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);