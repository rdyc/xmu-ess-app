import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { WorkflowStatusType } from '@common/classes/types';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeSummary } from '@kpi/components/employee/detail/shared/KPIEmployeeSummary';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { KPIEmployeeFilter } from './KPIEmployeeFilter';
import { KPIEmployeeListProps } from './KPIEmployeeList';

export const KPIEmployeeListView: React.SFC<KPIEmployeeListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.ManagerKPIInput,
        parentUid: AppMenu.HumanResource,
        title: props.intl.formatMessage(kpiMessage.employee.page.managerListTitle),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),
      }}

      // state & fields
      state={props.kpiEmployeeState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIEmployee) => (
        <KPIEmployeeSummary data={item} />
      )}
      actionComponent={(item: IKPIEmployee) => (
        <React.Fragment>
          {
            (item.statusType === WorkflowStatusType.Submitted ||
            (item.statusType === WorkflowStatusType.Accepted && item.isFinal)) &&
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/kpi/employees/form`, {uid : item.uid})}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/employees/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.employee"
          default={props.kpiEmployeeState.all.request && props.kpiEmployeeState.all.request.filter && props.kpiEmployeeState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push(`/kpi/employees/form`)}
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
              disabled={props.kpiEmployeeState.all.isLoading || props.kpiEmployeeState.all.isError}
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

    <KPIEmployeeFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        statusTypes: props.statusTypes,
        status: props.status,
        isFinal: props.isFinal
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);