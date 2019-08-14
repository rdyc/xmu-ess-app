import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeKPI } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { EmployeeKPISummary } from '../../detail/shared/EmployeeKPISummary';
import { EmployeeKPIListProps } from './EmployeeKPIList';

export const EmployeeKPIListView: React.SFC<EmployeeKPIListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.EmployeeKPI,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/kpi/employees',
        title: props.intl.formatMessage(kpiMessage.template.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.template.page.listSubHeader),
      }}

      // state & fields
      state={props.employeeKPIState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IEmployeeKPI) => (
        <EmployeeKPISummary data={item} />
      )}
      actionComponent={(item: IEmployeeKPI) => (
        <React.Fragment>
           <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/employees/${item.employeeUid}/form`, { uid: item.uid, employeeName: item.employee && item.employee.fullName || '' })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

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
          default={props.employeeKPIState.all.request && props.employeeKPIState.all.request.filter && props.employeeKPIState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/kpi/templates/form', { employeeUid: props.match.params.employeeUid, employeeName: props.location.state.employeeName})}
        >
          <AddCircle/>
        </IconButton>
      }

    />
  </React.Fragment>
);