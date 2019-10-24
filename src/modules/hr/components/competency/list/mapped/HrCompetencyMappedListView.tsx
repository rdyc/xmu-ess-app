import AppMenu from '@constants/AppMenu';
import { IHrCompetencyMapped } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyMappedFilter } from './HrCompetencyMappedFilter';
import { HrCompetencyMappedListProps } from './HrCompetencyMappedList';
import { HrCompetencySummaryMapped } from './HrCompetencySummaryMapped';

export const HrCompetencyMappedListView: React.SFC<HrCompetencyMappedListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.CompetencyMapped,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'HR Competency Mapping'}),
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
            onClick={() => props.history.push(`/hr/competency/mapped/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/competency/mapped/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="hr.competency.mapped"
          default={props.hrCompetencyMappedState.all.request && props.hrCompetencyMappedState.all.request.filter && props.hrCompetencyMappedState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/hr/competency/mapped/form')}
        >
          <AddCircle/>
        </IconButton>
      }
      // data toolbar component
      toolbarDataComponent={
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
        >
          <div>
            <IconButton
              id="option-filter"
              disabled={props.hrCompetencyMappedState.all.isLoading || props.hrCompetencyMappedState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <HrCompetencyMappedFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
        positionUid: props.positionUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);