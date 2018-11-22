// import AppMenu from '@constants/AppMenu';
// import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { IAppBarMenu } from '@layout/interfaces';
// import { layoutMessage } from '@layout/locales/messages';
// import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
// import { ITimesheetDetail } from '@timesheet/classes/response';
// import { TimesheetUserAction } from '@timesheet/classes/types';
// import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
// import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
// import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
// import * as React from 'react';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import { compose } from 'recompose';

// const config: SingleConfig<ITimesheetDetail, AllProps> = {
//   // page info
//   page: (props: AllProps) => ({
//     uid: AppMenu.TimesheetApproval,
//     parentUid: AppMenu.Timesheet,
//     title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
//     description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader),
//   }),

//   // action centre
//   showActionCentre: true,

//   // more
//   hasMore: true,
//   moreOptions: (props: AllProps, callback: SingleHandler): IAppBarMenu[] => ([
//     {
//       id: TimesheetUserAction.Refresh,
//       name: props.intl.formatMessage(layoutMessage.action.refresh),
//       enabled: true,
//       visible: true,
//       onClick: () => callback.handleForceReload()
//     }
//   ]),

//   // events
//   onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
//     const { user } = props.userState;
//     const { isLoading, request, response } = props.timesheetApprovalState.detail;
//     const { loadDetailRequest } = props.timesheetApprovalDispatch;

//     // when user is set and not loading and has timesheetUid in route params
//     if (user && !isLoading && props.match.params.timesheetUid) {
//       // when timesheetUid was changed or response are empty or force to reload
//       if ((request && request.timesheetUid !== props.match.params.timesheetUid) || !response || forceReload) {
//         loadDetailRequest({
//           companyUid: user.company.uid,
//           positionUid: user.position.uid,
//           timesheetUid: props.match.params.timesheetUid
//         });
//       } else {
//         // just take data from previous response
//         callback.handleResponse(response);
//       }
//     }
//   },
//   onUpdated: (states: AllProps, callback: SingleHandler) => {
//     const { isLoading, response } = states.timesheetApprovalState.detail;

//     callback.handleLoading(isLoading);
//     callback.handleResponse(response);
//   },

//   // primary
//   primaryComponent: (data: ITimesheetDetail, props: AllProps) => (
//     <TimesheetInformation data={data} />
//   ),

//   // secondary (multiple components are allowed)
//   secondaryComponents: (data: ITimesheetDetail, props: AllProps) => ([
//     <WorkflowHistory data={data.workflow} />
//   ])
// };

// interface OwnRouteParams {
//   timesheetUid: string;
// }

// type AllProps
//   = WithUser
//   & WithTimesheetApproval
//   & RouteComponentProps<OwnRouteParams>
//   & InjectedIntlProps;

// const timesheetApprovalDetail: React.SFC<AllProps> = props => (
//   <SinglePage
//     config={config}
//     connectedProps={props}
//   />
// );

// export const TimesheetApprovalDetail = compose(
//   withRouter,
//   withUser,
//   withTimesheetApproval,
//   injectIntl
// )(timesheetApprovalDetail);