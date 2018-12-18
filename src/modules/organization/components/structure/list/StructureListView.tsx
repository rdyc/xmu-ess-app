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
import { IStructure } from '@organization/classes/response/structure';
import { StructureField } from '@organization/classes/types';
import { structureFieldTranslator } from '@organization/helper/structureFieldTranslator';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { StructureSummary } from '../shared/StructureSummary';
import { StructureFilter } from './StructureFilter';
import { OrganizationStructureListProps } from './StructureList';

const config: CollectionConfig<IStructure, OrganizationStructureListProps> = {
  // page info
  page: (props: OrganizationStructureListProps) => ({
    uid: AppMenu.LookupOrganizationStructure,
    parentUid: AppMenu.Lookup,
    title: `${props.intl.formatMessage(organizationMessage.structure.page.listTitle)}`,
    description: props.intl.formatMessage(organizationMessage.structure.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(StructureField).map(key => ({
    value: key,
    name: StructureField[key]
  })),
  fieldTranslator: structureFieldTranslator,

  // selection
  hasSelection: false,

  // nav back?
  hasNavBack: false,

  // searching
  hasSearching: true,
  searchStatus: (props: OrganizationStructureListProps): boolean => {
    let result: boolean = false;

    const { request } = props.organizationStructureState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: OrganizationStructureListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
      onClick: () => callback.handleRedirectTo(`/organization/structure/form`)
    }
  ]),

  // events
  onDataLoad: (props: OrganizationStructureListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.organizationStructureState.all;
    const { loadAllRequest } = props.organizationStructureDispatch;

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
  onUpdated: (props: OrganizationStructureListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.organizationStructureState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IStructure, index: number, props: OrganizationStructureListProps) => ({
    key: item.uid,
    primary: item.uid,
    secondary: item.description || '-',
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

    // filter
  filterComponent: (callback: CollectionHandler, props: OrganizationStructureListProps) => (
    <StructureFilter 
      handleFind={props.handleChangeFilter}
      callbackForceReload={callback.handleForceReload}/>
  ),

  // summary component
  summaryComponent: (item: IStructure) => (
    <StructureSummary
      data={item}
    />
  ),

  // action component
  actionComponent: (item: IStructure, callback: CollectionHandler) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/structure/form`, { structureUid: item.uid, companyUid: item.companyUid  })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/structure/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),
};

// type AllProps
//   = WithUser
//   & WithOrganizationStructure
//   & RouteComponentProps<OwnRouteParams>
//   & InjectedIntlProps;

// interface OwnRouteParams {
//   category: string;
// }

export const structureListView: React.SFC<OrganizationStructureListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);
// export const StructureListView = compose(
//   withUser,
//   withOrganizationStructure,
//   injectIntl
// )(structureListView);