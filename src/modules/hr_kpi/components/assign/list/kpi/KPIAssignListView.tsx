import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import * as React from 'react';

import { IKPIAssign } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { CheckCircle, Tune } from '@material-ui/icons';
import { KPIAssignSummary } from '../../detail/shared/KPIAssignSummary';
import { KPIAssignFilter } from './KPIAssignFilter';
import { KPIAssignListProps } from './KPIAssignList';

export const KPIAssignListView: React.SFC<KPIAssignListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.HRKPIAssign,
        parentUid: AppMenu.Lookup,
        parentUrl: '/kpi/assigns',
        title: props.intl.formatMessage(kpiMessage.employee.page.listEmployeeTitle, {employeeName: props.history.location.state && props.history.location.state.employeeName && 
          props.history.location.state.employeeName || 'Employee'}),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),
      }}

      // state & fields
      state={props.kpiAssignState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIAssign) => (
        <KPIAssignSummary data={item} />
      )}
      actionComponent={(item: IKPIAssign) => (
        <React.Fragment>
           <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/assigns/${item.employeeUid}/form`, { uid: item.uid, employeeName: item.employee && item.employee.fullName || '' })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/assigns/${item.employeeUid}/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.template"
          default={props.kpiAssignState.all.request && props.kpiAssignState.all.request.filter && props.kpiAssignState.all.request.filter.find}
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
              disabled={props.kpiAssignState.all.isLoading || props.kpiAssignState.all.isError}
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

    <KPIAssignFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        isFinal: props.isFinal,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);