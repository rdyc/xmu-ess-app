import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, Cached } from '@material-ui/icons';
import { IWebJobRecurring } from '@webjob/classes/response';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { WebJobMonitoringTab } from '@webjob/components/tabs/WebJobMonitoringTab';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { RecurringTriggerForm } from '../form/trigger/RecurringTriggerForm';
import { WebJobRecurringListProps } from './WebJobRecurringList';
import { WebjobRecurringSummary } from './WebJobRecurringSummary';

export const WebJobRecurringListView: React.SFC<WebJobRecurringListProps> = props => (
  <WebJobMonitoringTab
    tab={MonitoringTabs.Recurrings}      
  >
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.WebJobRecurring,
        parentUid: AppMenu.WebJob,
        title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Recurring'}),
      }}

      // state & fields
      state={props.webJobRecurringState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IWebJobRecurring) => ( 
        <WebjobRecurringSummary data={item}/>
      )}
      actionComponent={(item: IWebJobRecurring) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/webjob/recurrings/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="webjob.recurrings"
          default={props.webJobRecurringState.all.request && props.webJobRecurringState.all.request.filter && props.webJobRecurringState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/webjob/recurrings/form')}
        >
          <AddCircle/>
        </IconButton>
      }
      toolbarDataComponent={
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(webJobMessage.recurring.field.type, {state: 'Trigger'})}
        >
          <div>
            <IconButton
              id="option-filter"
              disabled={props.webJobRecurringState.all.isLoading || props.webJobRecurringState.all.isError}
              onClick={() => props.handleTriggerVisibility(true)} 
            >
              <Cached/>              
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    {/* Trigger Form */}
    <RecurringTriggerForm 
      isOpen={props.isTriggerOpen}
      handleTriggerVisibility={props.handleTriggerVisibility}
    />
  </WebJobMonitoringTab>
);