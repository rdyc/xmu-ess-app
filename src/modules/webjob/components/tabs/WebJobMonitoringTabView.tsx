import { AppBar, Tab, Tabs } from '@material-ui/core';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { WebJobMonitoringTabProps } from './WebJobMonitoringTab';

export const WebJobMonitoringTabView: React.SFC<WebJobMonitoringTabProps> = props => {
  const { response, isLoading } = props.webJobMonitoringState.statisticAll;

  const tabs = Object.keys(MonitoringTabs).map((key, index) => ({
    id: key,
    name: MonitoringTabs[key]
  }));

  const findIdx = (page?: MonitoringTabs) => {
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
        <Tabs centered value={findIdx(props.webJobPageState.page.webJobPage) || 0} style={{
          color: '#fff',
          background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
        }}>
          {tabs.map(item => (
            <Tab
              key={item.id}
              label={
                isLoading ?
                <span className={props.classes.badgeParent}>
                {props.intl.formatMessage(webJobMessage.shared.fieldFor(item.name, 'fieldTab'))}
                  <span className={props.classes.badgeChild}>
                    ...
                  </span>
                </span>
                :
                (
                  response &&
                  response.data &&
                  response.data[item.name] !== undefined ?
                  <span className={props.classes.badgeParent}>
                  {props.intl.formatMessage(webJobMessage.shared.fieldFor(item.name, 'fieldTab'))}
                    <span className={props.classes.badgeChild} style={{transform: 'translate(50%, -50%)'}} >
                      {response.data[item.name] > 99 ? '99+' : response.data[item.name]}
                    </span>
                  </span>
                  :
                  props.intl.formatMessage(webJobMessage.shared.fieldFor(item.name, 'fieldTab'))
                )
              }
              onClick={() => {
                props.history.push(`/webjob/${item.name}`);
                props.webJobPage.changePage(item.name);
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
