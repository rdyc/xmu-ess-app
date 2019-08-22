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
import { KPIManagerInputListProps } from './KPIManagerInputList';

export const KPIManagerInputListView: React.SFC<KPIManagerInputListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.ManagerKPIInput,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/kpi/managerinputs',
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
            onClick={() => props.history.push(`/kpi/managerinputs/${item.employeeUid}/form`, { uid: item.uid, employeeName: item.employee && item.employee.fullName || '' })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/managerinputs/${item.employeeUid}/${item.uid}`)}
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