import { LookupLeaveTabs } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { LeaveTabProps } from './LeaveTab';

export const LeaveTabView: React.SFC<LeaveTabProps> = props => {
  const tabs = Object.keys(LookupLeaveTabs).map((key, index) => ({
    id: key,
    name: LookupLeaveTabs[key]
  }));

  const findIdx = (page?: LookupLeaveTabs) => {
    if (page) {
      const value = tabs.findIndex(idx => idx.name === page);
  
      if (value !== -1) {
        return value;
      }
    }
    return undefined;
  };
  
  const render = (
    <React.Fragment>
      <AppBar position="static">
        <Tabs centered value={findIdx(props.lookupLeaveState.page.leavePage) || 0} style={{
          color: '#fff',
          background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
        }}>
          {tabs.map(item => (
            <Tab
              key={item.id}
              label={props.intl.formatMessage(lookupMessage.leave.fieldFor(item.name, 'fieldTab'))}
              onClick={() => {
                props.history.push(`/lookup/leaves/${item.name}`);
                props.lookupLeaveDispatch.changePage(item.name);
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      {props.children}
    </React.Fragment>
  );

  return render;
};
