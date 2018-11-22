import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { TimesheetApprovalDetailView } from './TimesheetApprovalDetailView';

interface OwnRouteParams {
  timesheetUid: string;
}

export type TimesheetApprovalDetailProps
  = WithUser
  & WithTimesheetApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

export const TimesheetApprovalDetail = compose(
  withRouter,
  withUser,
  withTimesheetApproval,
  injectIntl,
)(TimesheetApprovalDetailView);