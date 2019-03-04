import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import * as React from 'react';

import { IEmployeeAccessHistory } from '@account/classes/response/employeeAccessHistory';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeAccessHistoryListProps } from './AccountEmployeeAccessHistoryList';
import { AccountEmployeeAccessHistorySummary } from './AccountEmployeeAccessHistorySummary';

export const AccountEmployeeAccessHistoryListView: React.SFC<AccountEmployeeAccessHistoryListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.history}        
    >
      <CollectionPage
        // page info
        info={{
          uid: AppMenu.LookupEmployee,
          parentUid: AppMenu.Lookup,
          parentUrl: '/account/employee',
          title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
          description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
        }}

        // state & fields
        state={props.accountEmployeeAccessHistoryState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeAccessHistory) => ( 
          <AccountEmployeeAccessHistorySummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeAccessHistory) => (
          <React.Fragment>
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/history/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
      />
    </DetailPage>
  </React.Fragment>
);