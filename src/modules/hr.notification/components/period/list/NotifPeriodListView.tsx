import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { INotifPeriod } from '@hr.notification/classes/response';
import { NotifPeriodSumarry } from '@hr.notification/components/period/shared/NotifPeriodSummary';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NotifPeriodListProps } from './NotifPeriodList';
import { NotifPeriodListFilter } from './NotifPeriodListFilter';

export const NotifPeriodListView: React.SFC<NotifPeriodListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.HRNotifPeriod,
        parentUid: AppMenu.HRNotif,
        title: props.intl.formatMessage(notifMessage.period.page.listTitle),
        description: props.intl.formatMessage(notifMessage.period.page.listSubHeader)
      }}

      // state & fields
      state={props.notifPeriodState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: INotifPeriod) => ( 
        <NotifPeriodSumarry data={item} />
      )}
      actionComponent={(item: INotifPeriod) => (
        <React.Fragment>
          {
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/notification/periods/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/notification/periods/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="hr.period.request"
          default={props.notifPeriodState.all.request && props.notifPeriodState.all.request.filter && props.notifPeriodState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/hr/notification/periods/form')}
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
              disabled={props.notifPeriodState.all.isLoading || props.notifPeriodState.all.isError}
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

    <NotifPeriodListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        type: props.type
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);