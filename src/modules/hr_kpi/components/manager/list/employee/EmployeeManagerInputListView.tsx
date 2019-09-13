import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import * as React from 'react';

import { IEmployee } from '@account/classes/response';
import { EmployeeSummary } from '@kpi/components/shared/EmployeeSummary';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { EmployeeManagerInputListProps } from './EmployeeManagerInputList';

export const EmployeeManagerInputListView: React.SFC<EmployeeManagerInputListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ManagerKPIInput,
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
            onClick={() => props.history.push(`/kpi/managerinputs/${item.uid}`, {employeeName: item.fullName})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.employee.managerinput"
          default={props.accountEmployeeState.all.request && props.accountEmployeeState.all.request.filter && props.accountEmployeeState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
    />
</React.Fragment>
);