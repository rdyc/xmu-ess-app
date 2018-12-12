import { CommonUserAction } from '@common/classes/types';
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
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { HierarchyField } from '@organization/classes/types';
import { hierarchyFieldTranslator } from '@organization/helper/hierarchyFieldTranslator';
import { withOrganizationHierarchy, WithOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';
import { OrganizationHierarchySummary } from '../detail/shared/OrganiationHierarchySummary';

const config: CollectionConfig<IHierarchy, AllProps> = {
  // page info
  page: (props: AllProps) => ({
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
  searchStatus: (props: AllProps): boolean => {
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
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.organizationHierarchyState.all;
    const { loadAllRequest } = props.organizationHierarchyDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: undefined,
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
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.organizationHierarchyState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IHierarchy, index: number, props: AllProps) => ({
    key: item.uid,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IHierarchy, props: AllProps) => ( 
    <OrganizationHierarchySummary 
      data={item}
      category={props.match.params.category}
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

type AllProps 
  = WithUser
  & WithOrganizationHierarchy
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

interface OwnRouteParams {
  category: string;
}

const organizationHierarchyListView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const OrganizationHierarchyListView = compose(
  withUser,
  withOrganizationHierarchy,
  injectIntl
)(organizationHierarchyListView);