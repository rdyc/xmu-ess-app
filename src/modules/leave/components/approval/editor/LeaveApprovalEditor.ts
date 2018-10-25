import { LeaveApprovalEditorView } from '@leave/components/approval/editor/LeaveApprovalEditorView';
import { compose } from 'recompose';

interface OwnProps {
  
}

export type LeaveApprovalProps
  = OwnProps;

export const Approval = compose<{}, LeaveApprovalProps>(

)(LeaveApprovalEditorView);