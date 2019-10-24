import { CollectionPage } from '@layout/components/pages';
import { IWebJobDefinitionJob } from '@webjob/classes/response';
import * as React from 'react';
import { DefinitionJobListProps } from './DefinitionJobList';
import { DefinitionJobSummary } from './DefinitionJobSummary';

export const DefinitionJobListView: React.SFC<DefinitionJobListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobDefinitionState.jobAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobDefinitionJob) => ( 
      <DefinitionJobSummary data={item}/>
    )}
  />
);