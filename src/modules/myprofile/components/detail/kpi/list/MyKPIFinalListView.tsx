import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import * as React from 'react';

import { IKPIFinal } from '@account/classes/response/employeeKPI';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { MyProfileTabs } from '@profile/classes/types/MyProfileTabs';
import { DetailProfile } from '../../DetailProfile';
import { MyKPIFinalSummary } from '../detail/shared/MyKPIFinalSummary';
import { MyKPIFinalListProps } from './MyKPIFinalList';

export const MyKPIAssignListView: React.SFC<MyKPIFinalListProps> = props => (
  <React.Fragment>
    <DetailProfile
      tab={MyProfileTabs.KPI}      
    >
      <CollectionPage 
        // page info
        info={{
          uid: AppMenu.MyProfile,
          parentUid: AppMenu.Account,
          title: props.intl.formatMessage(kpiMessage.employee.page.listEmployeeTitle, {employeeName: props.userState.user && props.userState.user.fullName || 'Employee'}),
          description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),
        }}

        // state & fields
        state={props.accountEmployeeKPIState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IKPIFinal) => (
          <MyKPIFinalSummary data={item} />
        )}
        actionComponent={(item: IKPIFinal) => (
          <React.Fragment>
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/account/profile/kpi/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
        
        // app bar component
        appBarSearchComponent={
          <SearchBox
            key="my.kpi.final.search"
            default={props.accountEmployeeKPIState.all.request && props.accountEmployeeKPIState.all.request.filter && props.accountEmployeeKPIState.all.request.filter.find}
            fields={props.fields}
            onApply={props.handleOnLoadApiSearch}
          />
        }
      />
    </DetailProfile>
  </React.Fragment>
);