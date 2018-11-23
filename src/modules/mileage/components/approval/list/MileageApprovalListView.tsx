import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField, MileageUserAction } from '@mileage/classes/types';
import { MileageSummary } from '@mileage/components/request/shared/MileageSummary';
import { mileageRequestFieldTranslator } from '@mileage/helper';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IMileageRequest, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.MileageApproval,
    parentUid: AppMenu.Mileage,
    title: props.intl.formatMessage(mileageMessage.approval.page.listTitle),
    description: props.intl.formatMessage(mileageMessage.approval.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(MileageRequestField).map(key => ({
    value: key,
    name: MileageRequestField[key]
  })),
  fieldTranslator: mileageRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.mileageApprovalState.all;

    if (request && request.filter && request.filter.query && request.filter.query.find) {
      result = request.filter.query.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: MileageUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
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
    const { isLoading, response } = props.mileageApprovalState.all;
    const { loadAllRequest } = props.mileageApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            status: undefined,
            isNotify: undefined,
            query: {
              direction: params.direction,
              orderBy: params.orderBy,
              page: params.page,
              size: params.size,
              find: params.find,
              findBy: params.findBy
            },
            companyUid: user.company.uid,
            positionUid: user.position.uid,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.mileageApprovalState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IMileageRequest, index: number, props: AllProps) => ({
    key: index,
    primary: props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
    secondary: item.employee && item.employee.fullName || item.employeeUid,
    tertiary: props.intl.formatNumber(item.amount),
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IMileageRequest) => ( 
    <MileageSummary data={item} />
  ),

  // action component
  actionComponent: (item: IMileageRequest, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/mileage/approvals/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithMileageApproval;

const mileageApprovalList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const MileageApprovalList = compose(
  withUser,
  injectIntl,
  withMileageApproval
)(mileageApprovalList);