import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { IMileageException } from '@lookup/classes/response';
import { MileageExceptionRequestField, MileageExceptionUserAction } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupMileageExceptionSummary } from './LookupMileageExceptionSummary';

const config: CollectionConfig<IMileageException, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupMileageException,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.mileageException.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.mileageException.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(MileageExceptionRequestField).map(key => ({
    value: key,
    name: MileageExceptionRequestField[key]
  })),
  // fieldTranslator: mileageRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.mileageExceptionState.all;

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
      id: MileageExceptionUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: MileageExceptionUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/mileageexception/form`)
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
    const { isLoading, response } = props.mileageExceptionState.all;
    const { loadAllRequest } = props.mileageExceptionDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
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
    const { isLoading, response } = props.mileageExceptionState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IMileageException, index: number, props: AllProps) => ({
    key: index,
    primary: item.role.name,
    secondary: `${item.percentage.toString()} %`,
    tertiary: item.type && item.type.value || item.siteType,
    quaternary: item.reason ? item.reason : 'N/A',
    quinary: item.role && item.role.company && item.role.company.name,
    senary: item.inactiveDate ? props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) : 'N/A'
  }),

  // summary component
  summaryComponent: (item: IMileageException) => ( 
    <LookupMileageExceptionSummary data={item} />
  ),

  // action component
  actionComponent: (item: IMileageException, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/mileageexception/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithLookupMileageException;

const mileageExceptionList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const MileageExceptionList = compose(
  withUser,
  injectIntl,
  withLookupMileageException
)(mileageExceptionList);