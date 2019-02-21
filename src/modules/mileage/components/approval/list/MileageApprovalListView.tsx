import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IMileageRequest } from '@mileage/classes/response';
import { MileageSummary } from '@mileage/components/request/shared/MileageSummary';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { MileageApprovalListProps } from './MileageApprovalList';
import { MileageApprovalListFilter } from './MileageApprovalListFilter';

export const MileageApprovalListView: React.SFC<MileageApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.MileageApproval,
        parentUid: AppMenu.Mileage,
        title: props.intl.formatMessage(mileageMessage.approval.page.listTitle),
        description: props.intl.formatMessage(mileageMessage.approval.page.listSubHeader),
      }}
      // state & fields
      state={props.mileageApprovalState.all}
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
            onClick={() => props.history.push(`/mileage/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="mileage.approval"
          default={props.mileageApprovalState.all.request && props.mileageApprovalState.all.request.filter && props.mileageApprovalState.all.request.filter.find}
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
              disabled={props.mileageApprovalState.all.isLoading || props.mileageApprovalState.all.isError}
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
    <MileageApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        employeeUid: props.employeeUid,
        year: props.year,
        month: props.month,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);