import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IEmployee } from '@account/classes/response';
import { EmployeeSummary } from '@kpi/components/shared/EmployeeSummary';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { EmployeeHRInputFilter } from './EmployeeHRInputFilter';
import { EmployeeHRInputListProps } from './EmployeeHRInputList';

export const EmployeeHRInputListView: React.SFC<EmployeeHRInputListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.HRKPIInput,
        parentUid: AppMenu.HumanResource,
        title: props.intl.formatMessage(kpiMessage.employee.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),

      }}

      // state & fields
      state={props.accountEmployeeState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IEmployee) => ( 
        <EmployeeSummary data={item} />
      )}
      actionComponent={(item: IEmployee) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/hrinputs/${item.uid}`, {employeeName: item.fullName})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.employee.hrinput"
          default={props.accountEmployeeState.all.request && props.accountEmployeeState.all.request.filter && props.accountEmployeeState.all.request.filter.find}
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
              disabled={props.accountEmployeeState.all.isLoading || props.accountEmployeeState.all.isError}
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

    <EmployeeHRInputFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUids: props.companyUids,
        positionUids: props.positionUids,
        useAccess: props.useAccess,
        isActive: props.isActive,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
</React.Fragment>
);