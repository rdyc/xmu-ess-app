import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IRole } from '@lookup/classes/response';
import { RoleField, RoleUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupRoleSumarry } from '../detail/shared/LookupRoleSummary';
import { LookupRoleFilter } from './LookupRoleFilter';
import { RoleListProps } from './LookupRoleList';

const config: CollectionConfig<IRole, RoleListProps> = {
  // page info
  page: (props: RoleListProps) => ({
    uid: AppMenu.LookupRole,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.role.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.role.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(RoleField)
    .map(key => ({
      value: key,
      name: RoleField[key]
    })),
  // fieldTranslator: timesheetEntryFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: RoleListProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupRoleState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: RoleListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: RoleUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: RoleUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/roles/form`)
    }
  ]),

  // events
  onDataLoad: (props: RoleListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupRoleState.all;
    const { loadAllRequest } = props.lookupRoleDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: props.companyUid,
            find: params.find,
            findBy: params.findBy,
            orderBy: params.orderBy,
            direction: params.direction,
            page: params.page,
            size: params.size,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: RoleListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupRoleState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IRole, index: number, props: RoleListProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company ? item.company.name : 'N/A',
    quaternary: item.description ? item.description : 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: RoleListProps) => (
    <LookupRoleFilter 
      handleFind={props.handleChangeFilter}
      callbackForceReload={callback.handleForceReload}
    />
  ),

  // summary component
  summaryComponent: (item: IRole) => (
    <LookupRoleSumarry data={item} />
  ),

  // action component
  actionComponent: (item: IRole, callback: CollectionHandler, props: RoleListProps) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
      >
        <FormattedMessage {...layoutMessage.action.delete}/>
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/roles/form`, { uid: item.uid, companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/roles/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),

};

export const LookupRoleListView: React.SFC<RoleListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleSubmit}
    />
  </CollectionPage>
);