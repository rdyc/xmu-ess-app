import { ApprovalView } from '@expense/components/approval/detail/approval/ApprovalView';
import { compose } from 'recompose';

interface OwnProps {
  
}

export type ApprovalProps
  = OwnProps;

export const Approval = compose<{}, ApprovalProps>(

)(ApprovalView);