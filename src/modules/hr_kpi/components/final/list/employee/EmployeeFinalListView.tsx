import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPI';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { EmployeeAssignFilter } from './EmployeeFinalFilter';
import { AccountEmployeeFinalListProps } from './EmployeeFinalList';
import { EmployeeFinalSummary } from './EmployeeFinalSummary';

export const EmployeeFinalListView: React.SFC<AccountEmployeeFinalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.KPIEmployee,
        parentUid: AppMenu.HumanResource,
        title: props.intl.formatMessage(kpiMessage.employee.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),

      }}

      // state & fields
      state={props.accountEmployeeKPIState.allFinal}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IEmployeeKPIFinal) => ( 
        <EmployeeFinalSummary data={item} />
      )}
      actionComponent={(item: IEmployeeKPIFinal) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/finals/${item.uid}`, {employeeName: item.fullName})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="employee.kpi.final"
          default={props.accountEmployeeKPIState.allFinal.request && props.accountEmployeeKPIState.allFinal.request.filter && props.accountEmployeeKPIState.allFinal.request.filter.find}
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
              id="option-filter-employee-final"
              disabled={props.accountEmployeeKPIState.allFinal.isLoading || props.accountEmployeeKPIState.allFinal.isError}
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

    <EmployeeAssignFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
        isActive: props.isActive,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
</React.Fragment>
);