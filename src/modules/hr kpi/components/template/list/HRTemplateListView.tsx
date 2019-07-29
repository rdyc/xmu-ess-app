import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IKPITemplate } from '@KPI/classes/response';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { KPITemplateListProps } from './KPITemplateList';
import { KPITemplateFilter } from './KPITemplateListFilter';
import { KPITemplateSummary } from './KPITemplateSummary';

export const KPITemplateListView: React.SFC<KPITemplateListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(KPIMessage.template.page.listTitle),
        description: props.intl.formatMessage(KPIMessage.template.page.listSubHeader),
      }}

      // state & fields
      state={props.KPITemplateState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPITemplate) => (
        <KPITemplateSummary data={item} />
      )}
      actionComponent={(item: IKPITemplate) => (
        <React.Fragment>
           <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/templates/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/templates/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="kpi.template"
          default={props.KPITemplateState.all.request && props.KPITemplateState.all.request.filter && props.KPITemplateState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/kpi/templates/form')}
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
              disabled={props.KPITemplateState.all.isLoading || props.KPITemplateState.all.isError}
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
    <KPITemplateFilter 
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