import AppMenu from '@constants/AppMenu';
import { IHrCompetencyMapped } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyMappedListProps } from './HrCompetencyMappedList';
import { HrCompetencySummaryMapped } from './HrCompetencySummaryMapped';

export const HrCompetencyMappedListView: React.SFC<HrCompetencyMappedListProps> = props => (
  <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupCompetencyMapped,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'Competency Mapped'}),
        description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
      }}

      // state & fields
      state={props.hrCompetencyMappedState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IHrCompetencyMapped) => ( 
        <HrCompetencySummaryMapped data={item}/>
      )}
      actionComponent={(item: IHrCompetencyMapped) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competencymapped/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/competencymapped/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.competency.mapped"
          default={props.hrCompetencyMappedState.all.request && props.hrCompetencyMappedState.all.request.filter && props.hrCompetencyMappedState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/competencymapped/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
);