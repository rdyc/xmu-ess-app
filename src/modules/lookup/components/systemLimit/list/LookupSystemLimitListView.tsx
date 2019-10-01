import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { ISystemLimit } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { LookupSystemLimitFilter } from './LookupSystemLimitFilter';
import { LookupSystemLimitListProps } from './LookupSystemLimitList';
import { LookupSystemLimitSummary } from './LookupSystemLimitSummary';

export const LookupSystemLimitListView: React.SFC<LookupSystemLimitListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupSystemLimit,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.systemLimit.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.systemLimit.page.listSubHeader),
      }}

      // state & fields
      state={props.systemLimitState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ISystemLimit) => (
        <LookupSystemLimitSummary data={item} />
      )}
      actionComponent={(item: ISystemLimit) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/systemlimits/form`, { uid: item.uid, companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}            
          </Button>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/systemlimits/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.systemlimit"
          default={props.systemLimitState.all.request && props.systemLimitState.all.request.filter && props.systemLimitState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/systemlimits/form')}
        >
          <AddCircle/>
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
              disabled={props.systemLimitState.all.isLoading || props.systemLimitState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />
    <LookupSystemLimitFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
        categoryType: props.categoryType
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);