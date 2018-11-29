import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField, LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveSummary } from '@leave/components/request/detail/shared/LeaveSummary';
import { leaveRequestFieldTranslator } from '@leave/helper';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<ILeave, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.LeaveApproval,
    parentUid: AppMenu.LeaveRequest,
    title: props.intl.formatMessage(leaveMessage.cancellation.page.listTitle),
    description: props.intl.formatMessage(leaveMessage.cancellation.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LeaveRequestField)
    .map(key => ({ 
      value: key, 
      name: LeaveRequestField[key] 
    })),
  fieldTranslator: leaveRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.leaveCancellationState.all;

    if (request && request.filter && request.filter.query) {
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
      id: LeaveRequestUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.leaveCancellationState.all;
    const { loadAllRequest } = props.leaveCancellationDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            query: {
              find: params.find,
              findBy: params.findBy,
              orderBy: params.orderBy,
              direction: params.direction,
              page: params.page,
              size: params.size,
            }
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.leaveCancellationState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILeave, index: number) => ({
    key: index,
    primary: item.reason,
    secondary: item.leave && item.leave.value || item.leaveType,
    tertiary: item.regular && item.regular.leave && item.regular.leave.name || 'N/A',
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ILeave) => ( 
    <LeaveSummary data={item} />
  ),

  // action component
  actionComponent: (item: ILeave, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/leave/cancellations/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithLeaveCancellation
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LeaveCancellationList = compose(
  withUser,
  withLeaveCancellation,
  injectIntl
)(listView);