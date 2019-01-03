import { CommonUserAction } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { HierarchyField } from '@organization/classes/types';
import { hierarchyFieldTranslator } from '@organization/helper/hierarchyFieldTranslator';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OrganizationHierarchySummary } from '../detail/shared/OrganiationHierarchySummary';
import { OrganizationHierarchyFilter } from './OrganizationHierarchyFilter';
import { OrganizationHierarchyListProps } from './OrganizationHierarchyList';

const config: CollectionConfig<IHierarchy, OrganizationHierarchyListProps> = {
  // page info
  page: (props: OrganizationHierarchyListProps) => ({
    uid: AppMenu.LookupApprovalHierarchy,
    parentUid: AppMenu.Lookup,
    title: `${props.intl.formatMessage(organizationMessage.hierarchy.page.listTitle)}`,
    description: props.intl.formatMessage(organizationMessage.hierarchy.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(HierarchyField).map(key => ({ 
    value: key, 
    name: HierarchyField[key] 
  })),
  fieldTranslator: hierarchyFieldTranslator,

  // selection
  hasSelection: false,

  // nav back?
  hasNavBack: false,

  // searching
  hasSearching: true,
  searchStatus: (props: OrganizationHierarchyListProps): boolean => {
    let result: boolean = false;

    const { request } = props.organizationHierarchyState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: OrganizationHierarchyListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: CommonUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: CommonUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/organization/hierarchy/form`)
    }
  ]),

  // events
  onDataLoad: (props: OrganizationHierarchyListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.organizationHierarchyState.all;
    const { loadAllRequest } = props.organizationHierarchyDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: props.companyUid,
            direction: params.direction,
            orderBy: params.orderBy,
            page: params.page,
            size: params.size,
            find: params.find,
            findBy: params.findBy,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: OrganizationHierarchyListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.organizationHierarchyState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IHierarchy, index: number, props: OrganizationHierarchyListProps) => ({
    key: item.uid,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: OrganizationHierarchyListProps) => (
    <OrganizationHierarchyFilter 
      handleFind={props.handleChangeFilter} 
      callbackForceReload={callback.handleForceReload}
    />
  ),

  // summary component
  summaryComponent: (item: IHierarchy, props: OrganizationHierarchyListProps) => ( 
    <OrganizationHierarchySummary 
      data={item}
    />
  ),

  // action component
  actionComponent: (item: IHierarchy, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/hierarchy/form`, { companyUid: item.companyUid, hierarchyUid: item.uid })}
      >
        <FormattedMessage {...layoutMessage.action.modify}/>
      </Button>

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/hierarchy/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

export const organizationHierarchyListView: React.SFC<OrganizationHierarchyListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);