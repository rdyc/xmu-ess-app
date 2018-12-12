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
import { IStructure } from '@organization/classes/response/structure';
import { StructureField } from '@organization/classes/types';
import { structureFieldTranslator } from '@organization/helper/structureFieldTranslator';
import { withOrganizationStructure, WithOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';
import { StructureSummary } from '../shared/StructureSummary';
import { StructureFilter } from './StructureFilter';

const config: CollectionConfig<IStructure, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupOrganization,
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
  searchStatus: (props: AllProps): boolean => {
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
      onClick: () => callback.handleRedirectTo(`/organization/structure/form`)
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.organizationStructureState.all;
    const { loadAllRequest } = props.organizationStructureDispatch;

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
    const { isLoading, response } = props.organizationStructureState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IStructure, index: number, props: AllProps) => ({
    key: item.uid,
    primary: item.uid,
    secondary: item.description || '-',
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

    // filter
  filterComponent: (callback: CollectionHandler) => (
    <StructureFilter handleFind={callback.handleFilter} />
  ),

  // summary component
  summaryComponent: (item: IStructure, props: AllProps) => (
    <StructureSummary
      data={item}
      // category={props.match.params.category}
    />
  ),

  // action component
  actionComponent: (item: IStructure, callback: CollectionHandler) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/structure/form`, { id: item.uid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/organization/structure/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),
};
type AllProps
  = WithUser
  & WithOrganizationStructure
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;
interface OwnRouteParams {
  category: string;
}
const structureList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);
export const StructureList = compose(
  withUser,
  withOrganizationStructure,
  injectIntl
)(structureList);