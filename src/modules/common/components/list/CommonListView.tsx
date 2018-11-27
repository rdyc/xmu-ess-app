import { ISystem } from '@common/classes/response';
import { CommonField, CommonUserAction } from '@common/classes/types';
import { CommonSummary } from '@common/components/detail/shared/CommonSummary';
import { categoryTypeTranslator, commonFieldTranslator } from '@common/helper';
import { withCommonSystem, WithCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
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
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';

const config: CollectionConfig<ISystem, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.SystemSetup,
    parentUid: AppMenu.Setup,
    title: props.intl.formatMessage(commonMessage.system.page.title),
    description: props.intl.formatMessage(commonMessage.system.page.subTitle),
  }),
  
  // top bar
  fields: Object.keys(CommonField).map(key => ({ 
    value: key, 
    name: CommonField[key] 
  })),
  fieldTranslator: commonFieldTranslator,

  // selection
  hasSelection: false,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.commonSystemState.all;

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
      onClick: () => callback.handleRedirectTo('/common/form')
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.commonSystemState.all;
    const { systemAllRequest } = props.commonDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        systemAllRequest({
          category: categoryTypeTranslator(props.match.params.category),
          filter: {
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
    const { isLoading, response } = props.commonSystemState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
    callback.handleForceReload();
  },
  onBind: (item: ISystem, index: number) => ({
    key: index,
    primary: item.name,
    secondary: '',
    tertiary: item.description && item.description || 'N/A',
    quaternary: item.type,
    quinary: item.isActive ? 'Active' : 'Inactive',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ISystem) => ( 
    <CommonSummary data={item} />
  ),

  // action component
  actionComponent: (item: ISystem, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/common/requests`, { uid: item.id })}
      >
        <FormattedMessage {...layoutMessage.action.modify}/>
      </Button>

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/common/requests/${item.id}`)}
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
  & WithCommonSystem
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

interface OwnRouteParams {
  category: string;
}

const commonListView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const CommonListView = compose(
  withUser,
  withCommonSystem,
  injectIntl
)(commonListView);