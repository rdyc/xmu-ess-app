import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { EmployeeAssignSubOrdinateFilter } from './EmployeeFinalSubOrdinateFilter';
import { AccountEmployeeFinalSubOrdinateListProps } from './EmployeeFinalSubOrdinateList';
import { EmployeeFinalSummary } from './EmployeeFinalSubOrdinateSummary';

export const EmployeeFinalSubOrdinateListView: React.SFC<AccountEmployeeFinalSubOrdinateListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.KPISubOrdinate,
        parentUid: AppMenu.HumanResource,
        title: props.intl.formatMessage(kpiMessage.employee.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),

      }}

      // state & fields
      state={props.organizationStructureState.subOrdinateTreeKPIFinal}
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
            onClick={() => props.history.push(`/kpi/subordinates/${item.uid}`, {employeeName: item.fullName})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="employee.kpi.final.subordinate"
          default={props.organizationStructureState.subOrdinateTreeKPIFinal.request &&
            props.organizationStructureState.subOrdinateTreeKPIFinal.request.filter &&
            props.organizationStructureState.subOrdinateTreeKPIFinal.request.filter.find}
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
              id="option-filter-employee-final-subordinate"
              disabled={props.organizationStructureState.subOrdinateTreeKPIFinal.isLoading || props.organizationStructureState.subOrdinateTreeKPIFinal.isError}
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

    <EmployeeAssignSubOrdinateFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        isActive: props.isActive,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
</React.Fragment>
);