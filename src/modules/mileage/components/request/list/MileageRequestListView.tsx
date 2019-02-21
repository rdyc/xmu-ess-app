import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IMileageRequest } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { MileageSummary } from '../shared/MileageSummary';
import { MileageRequestListProps } from './MileageRequestList';
import { MileageRequestListFilter } from './MileageRequestListFilter';

export const MileageRequestListView: React.SFC<MileageRequestListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.MileageRequest,
        parentUid: AppMenu.Mileage,
        title: props.intl.formatMessage(mileageMessage.request.page.listTitle),
        description: props.intl.formatMessage(mileageMessage.request.page.listSubHeader),
      }}

      // state & fields
      state={props.mileageRequestState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IMileageRequest) => (
        <MileageSummary data={item} />
      )}
      actionComponent={(item: IMileageRequest) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/mileage/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="mileage.request"
          default={props.mileageRequestState.all.request && props.mileageRequestState.all.request.filter && props.mileageRequestState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/mileage/requests/form')}
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
              disabled={props.mileageRequestState.all.isLoading || props.mileageRequestState.all.isError}
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
    <MileageRequestListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        year: props.year,
        month: props.month,
        status: props.status,
        statusType: props.statusType,
        isRejected: props.isRejected
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);