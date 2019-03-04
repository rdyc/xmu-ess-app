import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeEducationListProps } from './AccountEmployeeEducationList';
import { AccountEmployeeEducationSummary } from './AccountEmployeeEducationSummary';

export const AccountEmployeeEducationListView: React.SFC<AccountEmployeeEducationListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.education}        
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
        state={props.accountEmployeeEducationState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeEducation) => ( 
          <AccountEmployeeEducationSummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeEducation) => (
          <React.Fragment>
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/education/form`, { educationUid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>

            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/education/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}

        appBarCustomComponent={
          <IconButton
            color="inherit"
            onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/education/form`)}
          >
            <AddCircle/>
          </IconButton>
        }
      />
    </DetailPage>
  </React.Fragment>
);