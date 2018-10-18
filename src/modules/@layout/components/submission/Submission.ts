import { SubmissionView } from '@layout/components/submission/SubmissionView';
import { compose } from 'recompose';

interface OwnProps {
  valid: boolean;
  submitting: boolean;
  reset: () => void;
  title?: string | undefined;
  subHeader?: string | undefined;
  labelSubmit?: string | undefined;
  labelReset?: string | undefined;
  labelProcessing?: string | undefined;
}

export type SubmissionProps
  = OwnProps;

export const Submission = compose<{}, SubmissionProps>(

)(SubmissionView);