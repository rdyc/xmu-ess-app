import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeave } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { LookupLeaveSummary } from '../detail/shared/LookupLeaveSummary';
import { LookupLeaveListProps } from './LookupLeaveList';
import { LookupLeaveListFilter } from './LookupLeaveListFilter';

export const LookupLeaveListView: React.SFC<LookupLeaveListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupLeave,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.leave.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.leave.page.listSubHeader),
      }}

      // state & fields
      state={props.lookupLeaveState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ILookupLeave) => (
        <LookupLeaveSummary data={item} />
      )}
      actionComponent={(item: ILookupLeave) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/leaves/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}            
          </Button>
          <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/leaves/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.leave"
          default={props.lookupLeaveState.all.request && props.lookupLeaveState.all.request.filter && props.lookupLeaveState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/leaves/form')}
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
              disabled={props.lookupLeaveState.all.isLoading || props.lookupLeaveState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="primary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />
    <LookupLeaveListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);