import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IDiem } from '@lookup/classes/response';
import { LookupDiemField } from '@lookup/classes/types/diem/DiemField';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { LookupDiemSummary } from '../detail/shared/LookupDiemSummary';
import { LookupDiemFilter } from './LookupDiemFilter';

const config: CollectionConfig<IDiem, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.LookupDiem,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.lookupDiem.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.lookupDiem.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(LookupDiemField)
    .map(key => ({
      value: key,
      name: LookupDiemField[key]
    })),

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupDiemState.all;

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
      id: DiemUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: DiemUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/diemvalue/form`)
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
    const { isLoading, response } = props.lookupDiemState.all;
    const { loadAllRequest } = props.lookupDiemDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            projectType: undefined,
            destinationType: undefined,
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
    const { isLoading, response } = props.lookupDiemState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IDiem, index: number, props: AllProps) => ({
    key: index,
    primary: item.company && item.company.name || item.companyUid ,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.destination && item.destination.value || item.destinationType,
    quaternary: props.intl.formatNumber(item.value),
    quinary: item.currency && item.currency.name || item.currencyUid,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupDiemFilter handleFind={callback.handleFilter}/>
  ),

  // summary component
  summaryComponent: (item: IDiem) => (
    <LookupDiemSummary data={item} />
  ),

  // action component
  actionComponent: (item: IDiem, callback: CollectionHandler) => (
    <React.Fragment>
      {
        <Button
          size="small"
          onClick={() => alert(item.uid)}
        >
          <FormattedMessage {...layoutMessage.action.delete} />
        </Button>
      }

      {
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/diemvalue/form`, {uid: item.uid, company: item.companyUid })}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/diemvalue/${item.uid}`, { company: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  )
};
type AllProps
  = WithUser
  & WithLookupDiem
  & InjectedIntlProps;
const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);
export const LookupDiemList = compose(
  withUser,
  withLookupDiem,
  injectIntl
)(listView);