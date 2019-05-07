import { AccountInformationTabs } from '@account/classes/types/AccountInformationTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { TabInformationProps } from './TabInformation';

export const TabInformationView: React.SFC<TabInformationProps> = props => {
  const tabs = Object.keys(AccountInformationTabs).map((key, index) => ({
    id: key,
    name: AccountInformationTabs[key]
  }));
  
  const render = (
    <React.Fragment>
      <AppBar position="static">
        <Tabs fullWidth value={props.tabValue} style={{
          color: '#fff',
          background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
        }}>
          {tabs.map(item => (
            <Tab
              key={item.id}
              label={props.intl.formatMessage(accountMessage.employee.fieldFor(item.id, 'fieldInformationTab'))}
              onClick={() =>
                props.history.push(`/account/information/${item.id !== 'information' ? item.id : ''}`)
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
