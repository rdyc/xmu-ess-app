import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { DetailPageProps } from './DetailPage';

export const DetailPageView: React.SFC<DetailPageProps> = props => {

  const tabs = Object.keys(AccountEmployeeTabs).map(key => ({
    id: key,
    name: AccountEmployeeTabs[key]
  }));
  
  const render = (
    <React.Fragment>
      <AppBar position="static">
        <Tabs
          value={props.tab}
          scrollButtons="auto"
          scrollable
        >
          {tabs.map(item =>
            <Tab 
              key={item.id} 
              label={props.intl.formatMessage(accountMessage.employee.fieldFor(item.name, 'fieldTab'))} 
              onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/${item.id}`, { employeeUid: props.match.params.employeeUid })}
            />  
          )}
        </Tabs>
      </AppBar>
      {props.children}
    </React.Fragment>
  );

  return render;
};