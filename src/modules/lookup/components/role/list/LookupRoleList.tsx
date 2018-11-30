import AppMenu from '@constants/AppMenu';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IRole } from '@lookup/classes/response';
import { RoleField, RoleUserAction } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupRoleSumarry } from '../detail/shared/LookupRoleSummary';

const config: CollectionConfig<IRole, AllProps> = {
  // page info
  page: (props: AllProps) => ({
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
  searchStatus: (props: AllProps): boolean => {
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
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
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

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupRoleState.all;
    const { loadAllRequest } = props.lookupRoleDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            // companyUid: undefined,
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
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupRoleState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IRole, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company ? item.company.name : 'N/A',
    quaternary: item.description ? item.description : 'N/A',
    quinary: item.grade ? item.grade.value : 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IRole) => (
    <LookupRoleSumarry data={item} />
  ),

  // action component
  actionComponent: (item: IRole, callback: CollectionHandler) => (
    <React.Fragment>
      <Button
        size="small"
        onClick= {() => alert('go to new page here')}
      >
        Delete
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

type AllProps
  = WithUser
  & WithLookupRole
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LookupRoleList = compose(
  withUser,
  withLookupRole,
  injectIntl
)(listView);