import { AccountEmployeeTabsNoContract, AccountEmployementStatus } from '@account/classes/types';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { DetailPageProps } from './DetailPage';

export const DetailPageView: React.SFC<DetailPageProps> = props => {
  const { isLoading } = props.accountEmployeeState.detail;

  const tabs = Object.keys(props.employmentType === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract : AccountEmployeeTabs).map((key, index) => ({
    id: key,
    name: props.employmentType === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract[key] : AccountEmployeeTabs[key]
  }));
  
  const render = (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={props.tabValue} scrollButtons="auto" scrollable style={{
          color: '#fff',
          background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
        }}>
          {tabs.map(item => (
            <Tab
              key={item.id}
              disabled={isLoading}
              label={props.intl.formatMessage(accountMessage.employee.fieldFor(item.id, 'fieldTab'))}
              onClick={() =>
                props.history.push(
                  `/account/employee/${props.match.params.employeeUid}/${
                    item.id
                  }`,
                  { employeeUid: props.match.params.employeeUid }
                )
              }
            />
          ))}
        </Tabs>
      </AppBar>
      {props.children}
    </React.Fragment>
  );

  return render;
};
