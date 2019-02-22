import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHoliday } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { LookupHolidaySummary } from '../detail/shared/LookupHolidaySummary';
import { LookupHolidayListProps } from './LookupHolidayList';
import { LookupHolidayListFilter } from './LookupHolidayListFilter';

export const LookupHolidayListView: React.SFC<LookupHolidayListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupHoliday,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.holiday.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.holiday.page.listSubHeader),
      }}

      // state & fields
      state={props.lookupHolidayState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ILookupHoliday) => (
        <LookupHolidaySummary data={item} />
      )}
      actionComponent={(item: ILookupHoliday) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/holidays/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}            
          </Button>
          <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/holidays/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.holiday"
          default={props.lookupHolidayState.all.request && props.lookupHolidayState.all.request.filter && props.lookupHolidayState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/holidays/form')}
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
              disabled={props.lookupHolidayState.all.isLoading || props.lookupHolidayState.all.isError}
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
    <LookupHolidayListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);