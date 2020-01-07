import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { IWebJobDefinition } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { WebJobDefinitionListProps } from './WebJobDefinitionList';
import { WebjobDefinitionSummary } from './WebJobDefinitionSummary';

export const WebJobDefinitionListView: React.SFC<WebJobDefinitionListProps> = props => (
  <CollectionPage
    // page info
    info={{
      uid: AppMenu.WebJob,
      parentUid: AppMenu.Home,
      title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Definition'}),
    }}

    // state & fields
    state={props.webJobDefinitionState.all}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobDefinition) => ( 
      <WebjobDefinitionSummary data={item}/>
    )}
    actionComponent={(item: IWebJobDefinition) => (
      <React.Fragment>
        <Button 
          size="small"
          color="secondary"
          onClick={() => props.history.push(`/webjob/definitions/${item.uid}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
      </React.Fragment>
    )}
    // app bar component
    appBarSearchComponent={
      <SearchBox
        key="webjob.definitions"
        default={props.webJobDefinitionState.all.request && props.webJobDefinitionState.all.request.filter && props.webJobDefinitionState.all.request.filter.find}
        fields={props.fields}
        onApply={props.handleOnLoadApiSearch}
      />
    }
    appBarCustomComponent={
      <IconButton
        color="inherit"
        onClick={() => props.history.push('/webjob/definitions/form')}
      >
        <AddCircle/>
      </IconButton>
    }
  />
);