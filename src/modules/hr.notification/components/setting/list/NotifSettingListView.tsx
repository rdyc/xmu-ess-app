import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { INotifSetting } from '@hr.notification/classes/response';
import { NotifSettingSumarry } from '@hr.notification/components/setting/shared/NotifSettingSummary';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NotifSettingListProps } from './NotifSettingList';
import { NotifSettingListFilter } from './NotifSettingListFilter';

export const NotifSettingListView: React.SFC<NotifSettingListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.HRNotifSetting,
        parentUid: AppMenu.HRNotif,
        title: props.intl.formatMessage(notifMessage.setting.page.listTitle),
        description: props.intl.formatMessage(notifMessage.setting.page.listSubHeader)
      }}

      // state & fields
      state={props.notifSettingState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: INotifSetting) => ( 
        <NotifSettingSumarry data={item} />
      )}
      actionComponent={(item: INotifSetting) => (
        <React.Fragment>
          {
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/notification/settings/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/notification/settings/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="hr.setting.request"
          default={props.notifSettingState.all.request && props.notifSettingState.all.request.filter && props.notifSettingState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/hr/notification/settings/form')}
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
              disabled={props.notifSettingState.all.isLoading || props.notifSettingState.all.isError}
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

    <NotifSettingListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);