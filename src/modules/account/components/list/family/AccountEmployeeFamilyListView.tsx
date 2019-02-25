import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeFamilyListProps } from './AccountEmployeeFamilyList';
import { AccountEmployeeFamilySummary } from './AccountEmployeeFamilySummary';

export const AccountEmployeeFamilyListView: React.SFC<AccountEmployeeFamilyListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.family}        
    >
      <CollectionPage
        // page info
        info={{
          uid: AppMenu.LookupEmployee,
          parentUid: AppMenu.Lookup,
          title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
          description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
        }}

        // state & fields
        state={props.accountEmployeeFamilyState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeFamily) => ( 
          <AccountEmployeeFamilySummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeFamily) => (
          <React.Fragment>
            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/family/form`, { familyUid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>

            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/family/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}

        appBarCustomComponent={
          <IconButton
            onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/family/form`)}
          >
            <AddCircle/>
          </IconButton>
        }
      />
    </DetailPage>
  </React.Fragment>
);