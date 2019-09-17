import AppMenu from '@constants/AppMenu';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyEmployeeFilter } from './HrCompetencyEmployeeFilter';
import { HrCompetencyEmployeeListProps } from './HrCompetencyEmployeeList';
import { HrCompetencySummaryEmployee } from './HrCompetencyEmployeeSummary';

export const HrCompetencyEmployeeListView: React.SFC<HrCompetencyEmployeeListProps> = props => (
  <React.Fragment>
    <CollectionPage
        // page info
        info={{
          uid: AppMenu.CompetencyAssessmentInput,
          parentUid: AppMenu.HumanResource,
          title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: '360 Assessment Input'}),
          description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
        }}
  
        // state & fields
        state={props.hrCompetencyEmployeeState.all}
        fields={props.fields}
  
        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IHrCompetencyEmployee) => ( 
          <HrCompetencySummaryEmployee data={item}/>
        )}
        actionComponent={(item: IHrCompetencyEmployee) => (
          <React.Fragment>
            {
              item.isDraft &&
              !item.isExpired && 
              <Button 
                size="small"
                color="secondary"
                onClick={() => props.history.push(`/hr/assessmentinput/form`, { uid: item.uid, positionUid: item.positionUid })}
              >
                {props.intl.formatMessage(layoutMessage.action.modify)}
              </Button>
            }
  
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/assessmentinput/${item.uid}`)}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
        // app bar component
        appBarSearchComponent={
          <SearchBox
            key="lookup.competency.employee"
            default={props.hrCompetencyEmployeeState.all.request && props.hrCompetencyEmployeeState.all.request.filter && props.hrCompetencyEmployeeState.all.request.filter.find}
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
                disabled={props.hrCompetencyEmployeeState.all.isLoading || props.hrCompetencyEmployeeState.all.isError}
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

    <HrCompetencyEmployeeFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        status: props.status
      }}
      onApply={props.handleFilterApplied}
      onClose={props.handleFilterVisibility}
    />
  </React.Fragment>
);