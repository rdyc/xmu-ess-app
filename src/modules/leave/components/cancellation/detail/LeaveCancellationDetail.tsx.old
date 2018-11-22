// import { AccountLeave } from '@account/components/leave/AccountLeave';
// import { LeaveType } from '@common/classes/types';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveRequestDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
// import { leaveMessage } from '@leave/locales/messages/LeaveMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

const config: SingleConfig<ILeaveRequestDetail, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: '234',
    parentUid: '232',
    title: 'Single Page',
    description: 'Demo of single page',
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LeaveRequestUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
  ]),

  // events
  onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.leaveCancellationState.detail;
    const { loadDetailRequest } = props.leaveCancellationDispatch;

    // when user is set and not loading and has LeaveUid in route params
    if (user && !isLoading && props.match.params.leaveUid) {
      // when LeaveUid was changed or response are empty or force to reload
      if ((request && request.leaveUid !== props.match.params.leaveUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          leaveUid: props.match.params.leaveUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: SingleHandler) => {
    const { isLoading, response } = states.leaveCancellationState.detail;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: ILeaveRequestDetail, props: AllProps) => (
    <LeaveInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ILeaveRequestDetail, props: AllProps) => ([
    <WorkflowHistory data={data.workflow} />
  ])
};

interface OwnRouteParams {
  leaveUid: string;
}

type AllProps 
  = WithUser
  & WithLeaveCancellation
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const leaveCancellationDetail: React.SFC<AllProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const LeaveCancellationDetail = compose(
  withRouter,
  withUser,
  withLeaveCancellation,
  injectIntl,
)(leaveCancellationDetail);