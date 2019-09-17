import AppMenu from '@constants/AppMenu';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyResultFilter } from './HrCompetencyResultFilter';
import { HrCompetencyResultListProps } from './HrCompetencyResultList';
import { HrCompetencySummaryResult } from './HrCompetencyResultSummary';

export const HrCompetencyResultListView: React.SFC<HrCompetencyResultListProps> = props => (
  <React.Fragment>
    <CollectionPage
        // page info
        info={{
          uid: AppMenu.CompetencyAssessmentResult,
          parentUid: AppMenu.HumanResource,
          title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: '360 Assessment Result'}),
          description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
        }}
  
        // state & fields
        state={props.hrCompetencyResultState.all}
        fields={props.fields}
  
        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IHrCompetencyEmployee) => ( 
          <HrCompetencySummaryResult data={item}/>
        )}
        actionComponent={(item: IHrCompetencyEmployee) => (
          <React.Fragment>
            {
              item.isDraft &&
              <Button 
                size="small"
                color="secondary"
                onClick={() => props.history.push(`/hr/assessmentresult/form`, { uid: item.uid, positionUid: item.positionUid, respondenUid: item.respondenUid })}
              >
                {props.intl.formatMessage(layoutMessage.action.modify)}
              </Button>
            }
  
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/assessmentresult/${item.uid}`, { positionUid: item.positionUid, respondenUid: item.respondenUid })}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
        // app bar component
        appBarSearchComponent={
          <SearchBox
            key="lookup.competency.result"
            default={props.hrCompetencyResultState.all.request && props.hrCompetencyResultState.all.request.filter && props.hrCompetencyResultState.all.request.filter.find}
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
                disabled={props.hrCompetencyResultState.all.isLoading || props.hrCompetencyResultState.all.isError}
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

    <HrCompetencyResultFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        status: props.status
      }}
      onApply={props.handleFilterApplied}
      onClose={props.handleFilterVisibility}
    />
  </React.Fragment>
);