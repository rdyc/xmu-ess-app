import AppMenu from '@constants/AppMenu';
import { IHrCompetencyAssessment } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyAssessmentFilter } from './HrCompetencyAssessmentFilter';
import { HrCompetencyAssessmentListProps } from './HrCompetencyAssessmentList';
import { HrCompetencySummaryAssessment } from './HrCompetencyAssessmentSummary';

export const HrCompetencyAssessmentListView: React.SFC<HrCompetencyAssessmentListProps> = props => (
  <React.Fragment>
    <CollectionPage
        // page info
        info={{
          uid: AppMenu.CompetencyAssessment,
          parentUid: AppMenu.HumanResource,
          title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: '360 Assessment'}),
          description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
        }}
  
        // state & fields
        state={props.hrCompetencyAssessmentState.all}
        fields={props.fields}
  
        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IHrCompetencyAssessment) => ( 
          <HrCompetencySummaryAssessment data={item}/>
        )}
        actionComponent={(item: IHrCompetencyAssessment) => (
          <React.Fragment>
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/assessment/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
  
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/assessment/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
        // app bar component
        appBarSearchComponent={
          <SearchBox
            key="lookup.competency.Assessment"
            default={props.hrCompetencyAssessmentState.all.request && props.hrCompetencyAssessmentState.all.request.filter && props.hrCompetencyAssessmentState.all.request.filter.find}
            fields={props.fields}
            onApply={props.handleOnLoadApiSearch}
          />
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
                disabled={props.hrCompetencyAssessmentState.all.isLoading || props.hrCompetencyAssessmentState.all.isError}
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
        appBarCustomComponent={
          <IconButton
            color="inherit"
            onClick={() => props.history.push('/hr/assessment/form')}
          >
            <AddCircle/>
          </IconButton>
        }
      />

    <HrCompetencyAssessmentFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        status: props.status
      }}
      onApply={props.handleFilterApplied}
      onClose={props.handleFilterVisibility}
    />
  </React.Fragment>
);