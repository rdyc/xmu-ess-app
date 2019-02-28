import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IMileageException } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { LookupMileageExceptionFilter } from './LookupMileageExceptionFilter';
import { LookupMileageExceptionProps } from './LookupMileageExceptionList';
import { LookupMileageExceptionSummary } from './LookupMileageExceptionSummary';

export const LookupMileageExceptionListView: React.SFC<LookupMileageExceptionProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupMileageException,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.mileageException.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.mileageException.page.listSubHeader),
      }}

      // state & fields
      state={props.mileageExceptionState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IMileageException) => (
        <LookupMileageExceptionSummary data={item} />
      )}
      actionComponent={(item: IMileageException) => (
        <React.Fragment>
           <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/mileageexceptions/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>
          <Button 
            size="small"
            onClick={() => props.history.push(`/lookup/mileageexceptions/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.mileageexception"
          default={props.mileageExceptionState.all.request && props.mileageExceptionState.all.request.filter && props.mileageExceptionState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/mileageexceptions/form')}
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
              disabled={props.mileageExceptionState.all.isLoading || props.mileageExceptionState.all.isError}
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
    <LookupMileageExceptionFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
        roleUid: props.roleUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);