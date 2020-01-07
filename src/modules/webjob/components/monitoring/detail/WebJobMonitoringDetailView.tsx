import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IWebJobMonitoringJobDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { WebJobMonitoringDetailProps } from './WebJobMonitoringDetail';
import { WebJobMonitoringHistory } from './WebJobMonitoringHistory';
import { WebJobMonitoringInformation } from './WebJobMonitoringInformation';

export const WebJobMonitoringDetailView: React.SFC<WebJobMonitoringDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.WebJob,
      parentUid: AppMenu.Home,
      parentUrl: `/webjob/monitoring/${props.match.params.type}`,
      title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Monitoring'}),
    }}
    state={props.webJobMonitoringState.jobDetail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IWebJobMonitoringJobDetail) => ([
      <WebJobMonitoringInformation data={data} />
    ])}
    quaternary={(data: IWebJobMonitoringJobDetail) => ([
      <WebJobMonitoringHistory data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="webjob-monitoring-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);