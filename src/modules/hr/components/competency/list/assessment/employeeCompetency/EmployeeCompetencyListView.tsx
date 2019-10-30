import AppMenu from '@constants/AppMenu';
import { IAccountEmployeeCompetency } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { EmployeeCompetencyFilter } from './EmployeeCompetencyFilter';
import { EmployeeCompetencyListProps } from './EmployeeCompetencyList';
import { HrCompetencySummaryAssessment } from './EmployeeCompetencySummary';

export const EmployeeCompetencyListView: React.SFC<EmployeeCompetencyListProps> = props => (
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
      state={props.hrCompetencyAssessmentState.employee}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IAccountEmployeeCompetency) => ( 
        <HrCompetencySummaryAssessment data={item}/>
      )}
      actionComponent={(item: IAccountEmployeeCompetency) => (
        <React.Fragment>
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
          key="employee.competency.assessment"
          default={props.hrCompetencyAssessmentState.employee.request && props.hrCompetencyAssessmentState.employee.request.filter && props.hrCompetencyAssessmentState.employee.request.filter.find}
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
              disabled={props.hrCompetencyAssessmentState.employee.isLoading || props.hrCompetencyAssessmentState.employee.isError}
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
          onClick={() => props.history.push(`/hr/assessment/form`)}
        >
          <AddCircle/>
        </IconButton>
      }
    />
    <EmployeeCompetencyFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        year: props.year,
        companyUid: props.companyUid,
        isAssess: props.isAssess,
        isActive: props.isActive,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);