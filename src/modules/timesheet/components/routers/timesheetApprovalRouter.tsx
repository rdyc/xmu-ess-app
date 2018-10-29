import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TimesheetApprovalDetail } from '../approval/detail/TimesheetApprovalDetail';
import { TimesheetApprovalListEditor } from '../approval/editor/TimesheetApprovalListEditor';
import { TimesheetApprovalList } from '../approval/list/TimesheetApprovalList';

type AllProps = RouteComponentProps;

const approvalListComponent = () => <TimesheetApprovalList orderBy="uid" direction="descending"/>;
const approvalDetailComponent = () => <TimesheetApprovalDetail/>;
const approvalListEditorComponent = () => <TimesheetApprovalListEditor orderBy="uid" direction="descending"/>;

export const timesheetApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/`} component={approvalListEditorComponent}/>
    <Route path={`${props.match.path}/history`} component={approvalListComponent}/>
    <Route path={`${props.match.path}/details/:timesheetUid`} component={approvalDetailComponent} />
  </Switch>
);