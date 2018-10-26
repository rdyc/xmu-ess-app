import { AccountLeaveInformationView } from '@account/components/views/AccountLeaveInformationView';
import { compose } from 'recompose';

interface OwnProps {
  
}

export type AccountLeaveProps
  = OwnProps;

export const Approval = compose<{}, AccountLeaveProps>(

)(AccountLeaveInformationView);