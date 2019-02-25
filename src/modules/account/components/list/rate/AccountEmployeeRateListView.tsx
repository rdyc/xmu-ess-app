import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
// import { layoutMessage } from '@layout/locales/messages';
import { /*Button,*/ IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeRateListProps } from './AccountEmployeeRateList';
import { AccountEmployeeRateSummary } from './AccountEmployeeRateSummary';

export const AccountEmployeeRateListView: React.SFC<AccountEmployeeRateListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.rate}        
    >
      <CollectionPage
        // page info
        info={{
          uid: AppMenu.LookupEmployee,
          parentUid: AppMenu.Lookup,
          title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Rate'}),
          description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
        }}

        // state & fields
        state={props.accountEmployeeRateState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeRate) => ( 
          <AccountEmployeeRateSummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeRate) => (
          <React.Fragment>
            {/* <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/rate/form`, { rateUid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>

            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/rate/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button> */}
          </React.Fragment>
        )}

        appBarCustomComponent={
          <IconButton
            onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/rate/form`)}
          >
            <AddCircle/>
          </IconButton>
        }
      />
    </DetailPage>
  </React.Fragment>
);