import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Card, CardHeader } from '@material-ui/core';
import { IWebJobDefinitionDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { DefinitionJobList } from './jobList/DefinitionJobList';
import { WebJobDefinitionDetailProps } from './WebJobDefinitionDetail';
import { WebJobDefinitionInformation } from './WebJobDefinitionInformation';

export const WebJobDefinitionDetailView: React.SFC<WebJobDefinitionDetailProps> = props => (
  <React.Fragment>
    <PreviewPage 
      info={{
        uid: AppMenu.WebJobDefinition,
        parentUid: AppMenu.WebJob,
        parentUrl: `/webjob/definitions/`,
        title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Definition'}),
      }}
      state={props.webJobDefinitionState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IWebJobDefinitionDetail) => ([
        <WebJobDefinitionInformation data={data} />
      ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu
          id="webjob-definition-option"
          selectable={false}
          menuOptions={props.menuOptions}
          onSelected={props.handleOnSelectedMenu}
        />
      }
    />
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(webJobMessage.shared.page.listTitle, {state: 'Job List'})}
      />
    </Card>
    <DefinitionJobList />

  </React.Fragment>
);