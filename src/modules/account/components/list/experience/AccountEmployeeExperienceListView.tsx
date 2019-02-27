import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { DetailPage } from '@account/components/detail/DetailPage';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { AccountEmployeeExperienceSummary } from './AcccountEmployeeExperienceSummary';
import { AccountEmployeeExperienceListProps } from './AccountEmployeeExperienceList';

export const AccountEmployeeExperienceListView: React.SFC<AccountEmployeeExperienceListProps> = props => (
  <React.Fragment>
    <DetailPage
        tab={AccountEmployeeTabs.experience}        
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
        state={props.accountEmployeeExperienceState.all}
        fields={props.fields}

        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IEmployeeExperience) => ( 
          <AccountEmployeeExperienceSummary data={item} employeeUid={props.match.params.employeeUid} />
        )}
        actionComponent={(item: IEmployeeExperience) => (
          <React.Fragment>
            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/experience/form`, { educationUid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>

            <Button 
              size="small"
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/experience/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}

        appBarCustomComponent={
          <IconButton
            onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/experience/form`)}
          >
            <AddCircle/>
          </IconButton>
        }
      />
    </DetailPage>
  </React.Fragment>
);