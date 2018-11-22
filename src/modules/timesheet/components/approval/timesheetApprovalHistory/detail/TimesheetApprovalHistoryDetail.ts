import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { TimesheetApprovalHistoryDetailView } from './TimesheetApprovalHistoryDetailView';

interface OwnRouteParams {
  timesheetUid: string;
}

export type TimesheetApprovalHistoryDetailProps
  = WithUser
  & WithTimesheetApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

export const TimesheetApprovalHistoryDetail = compose(
  withRouter,
  withUser,
  withTimesheetApproval,
  injectIntl,
)(TimesheetApprovalHistoryDetailView);