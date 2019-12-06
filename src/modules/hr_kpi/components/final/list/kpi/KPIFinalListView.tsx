import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import * as React from 'react';

import { IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { KPIFinalSummary } from '../../detail/shared/KPIFinalSummary';
import { KPIFinalListProps } from './KPIFinalList';

export const KPIAssignListView: React.SFC<KPIFinalListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.KPIEmployee,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/kpi/finals',
        title: props.intl.formatMessage(kpiMessage.employee.page.listEmployeeTitle, {employeeName: props.history.location.state && props.history.location.state.employeeName && 
          props.history.location.state.employeeName || 'Employee'}),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),
      }}

      // state & fields
      state={props.accountEmployeeKPIFinalState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIFinal) => (
        <KPIFinalSummary data={item} />
      )}
      actionComponent={(item: IKPIFinal) => (
        <React.Fragment>
           <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/finals/${item.employeeUid}/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.template"
          default={props.accountEmployeeKPIFinalState.all.request && props.accountEmployeeKPIFinalState.all.request.filter && props.accountEmployeeKPIFinalState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
    />
  </React.Fragment>
);