import { ISystem } from '@common/classes/response';
import { CommonCategory, CommonField, CommonUserAction } from '@common/classes/types';
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
    uid: AppMenu.Common,
    parentUid: AppMenu.Lookup,
    title: `${props.intl.formatMessage(commonMessage.system.page.title)} ${CommonCategory[props.match.params.category]}`,
    description: props.intl.formatMessage(commonMessage.system.page.subTitle),
  }),
  
  parentUrl: (props: AllProps) => `/common/system`,
  
  // top bar
  fields: Object.keys(CommonField).map(key => ({ 
    value: key, 
    name: CommonField[key] 
  })),
  fieldTranslator: commonFieldTranslator,

  // selection
  hasSelection: false,

  // nav back?
  hasNavBack: true,

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
      onClick: () => callback.handleRedirectTo(`/common/system/${props.match.params.category}/form`)
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
  },
  onBind: (item: ISystem, index: number, props: AllProps) => ({
    key: item.id,
    primary: item.type,
    secondary: item.name,
    tertiary: item.description && item.description || 'N/A',
    quaternary: item.isActive ? props.intl.formatMessage(layoutMessage.text.active) : props.intl.formatMessage(layoutMessage.text.inactive),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ISystem, props: AllProps) => ( 
    <CommonSummary 
      data={item}
      category={props.match.params.category}
    />
  ),

  // action component
  actionComponent: (item: ISystem, callback: CollectionHandler, props: AllProps) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/common/system/${props.match.params.category}/form`, { id: item.id })}
      >
        <FormattedMessage {...layoutMessage.action.modify}/>
      </Button>

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/common/system/${props.match.params.category}/${item.id}`)}
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