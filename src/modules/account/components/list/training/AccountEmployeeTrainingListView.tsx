import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeTrainingListProps } from './AccountEmployeeTrainingList';
import { AccountEmployeeTrainingSummary } from './AccountEmployeeTrainingSummary';

export const AccountEmployeeTrainingListView: React.SFC<AccountEmployeeTrainingListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.training}        
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
        state={props.accountEmployeeTrainingState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeTraining) => ( 
          <AccountEmployeeTrainingSummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeTraining) => (
          <React.Fragment>
            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/training/form`, { trainingUid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>

            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/training/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}

        appBarCustomComponent={
          <IconButton
            color="inherit"
            onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/training/form`)}
          >
            <AddCircle/>
          </IconButton>
        }
      />
    </DetailPage>
  </React.Fragment>
);