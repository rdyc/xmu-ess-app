import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeSummary } from '@kpi/components/shared/KPIEmployeeSummary';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { KPIEmployeeListProps } from './KPIEmployeeList';

export const KPIEmployeeListView: React.SFC<KPIEmployeeListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.EmployeeKPI,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/kpi/employees',
        title: props.intl.formatMessage(kpiMessage.employee.page.listEmployeeTitle, {employeeName: props.history.location.state && props.history.location.state.employeeName && 
          props.history.location.state.employeeName || 'Employee'}),
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
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/employees/${item.employeeUid}/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.template"
          default={props.kpiEmployeeState.all.request && props.kpiEmployeeState.all.request.filter && props.kpiEmployeeState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push(`/kpi/employees/${props.match.params.employeeUid}/form`, {employeeName: props.history.location.state && props.history.location.state.employeeName && 
            props.history.location.state.employeeName || 'Employee'})}
        >
          <AddCircle/>
        </IconButton>
      }

    />
  </React.Fragment>
);