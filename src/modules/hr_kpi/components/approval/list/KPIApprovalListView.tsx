import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import * as React from 'react';

import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeSummary } from '@kpi/components/employee/detail/shared/KPIEmployeeSummary';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { CheckCircle, Tune } from '@material-ui/icons';
import { KPIApprovalFilter } from './KPIApprovalFilter';
import { KPIApprovalListProps } from './KPIApprovalList';

export const KPIApprvoalListView: React.SFC<KPIApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.HRKPIInput,
        parentUid: AppMenu.HumanResource,
        title: props.intl.formatMessage(kpiMessage.employee.page.approvalListTitle),
        description: props.intl.formatMessage(kpiMessage.employee.page.listSubHeader),
      }}

      // state & fields
      state={props.kpiApprovalState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIEmployee) => (
        <KPIEmployeeSummary data={item} />
      )}
      actionComponent={(item: IKPIEmployee) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.approval"
          default={props.kpiApprovalState.all.request && props.kpiApprovalState.all.request.filter && props.kpiApprovalState.all.request.filter.find}
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
              disabled={props.kpiApprovalState.all.isLoading || props.kpiApprovalState.all.isError}
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

    <KPIApprovalFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
        statusTypes: props.statusTypes,
        status: props.status,
        isFinal: props.isFinal
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);