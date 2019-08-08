import AppMenu from '@constants/AppMenu';
import { IHrCompetencyCluster } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyClusterListProps } from './HrCompetencyClusterList';
import { HrCompetencySummaryCluster } from './HrCompetencySummaryCluster';

export const HrCompetencyClusterListView: React.SFC<HrCompetencyClusterListProps> = props => (
  <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupCompetencyCluster,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'Competency Cluster'}),
        description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
      }}

      // state & fields
      state={props.hrCompetencyClusterState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IHrCompetencyCluster) => ( 
        <HrCompetencySummaryCluster data={item}/>
      )}
      actionComponent={(item: IHrCompetencyCluster) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competencycluster/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competencycluster/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.competency.cluster"
          default={props.hrCompetencyClusterState.all.request && props.hrCompetencyClusterState.all.request.filter && props.hrCompetencyClusterState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/competencycluster/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
);