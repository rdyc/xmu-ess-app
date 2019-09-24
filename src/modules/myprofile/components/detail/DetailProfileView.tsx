import { AppBar, Tab, Tabs } from '@material-ui/core';
import { myMessage } from '@profile/locales/messages/myMessage';
import { MyProfileTabs } from 'modules/myprofile/classes/types/MyProfileTabs';
import * as React from 'react';
import { DetailProfileProps } from './DetailProfile';

export const DetailProfileView: React.SFC<DetailProfileProps> = props => {
  const tabs = Object.keys(MyProfileTabs).map((key, index) => ({
    id: key,
    name: MyProfileTabs[key]
  }));
  
  const render = (
    <React.Fragment>
      <AppBar position="static">
        <Tabs centered value={props.tabValue} style={{
          color: '#fff',
          background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
        }}>
          {tabs.map(item => (
            <Tab
              key={item.id}
              label={props.intl.formatMessage(myMessage.shared.fieldFor(item.id, 'fieldTab'))}
              onClick={() => props.history.push(`/account/profile/${item.name}`)}
            />
          ))}
        </Tabs>
      </AppBar>
      {props.children}
    </React.Fragment>
  );

  return render;
};
