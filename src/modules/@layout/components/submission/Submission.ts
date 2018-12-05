import { SubmissionView } from '@layout/components/submission/SubmissionView';
import { WithForm, withForm } from '@layout/hoc/withForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

interface OwnProps {
  valid: boolean;
  submitting: boolean;
  reset: () => void;
  title?: string | undefined;
  subHeader?: string | undefined;
  labelSubmit?: string | undefined;
  labelReset?: string | undefined;
  labelProcessing?: string | undefined;
  withSubmitDialog?: boolean | false;
  submitDialogFullScreen?: boolean | false;
  submitDialogTitle?: string;
  submitDialogContentText?: string;
  submitDialogCancelText?: string;
  submitDialogConfirmedText?: string;
  formName?: string;
  onDialogSubmit?: () => void;
}

interface OwnHandler {
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  isOpenDialog: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type SubmissionProps
  = OwnProps
  & WithForm
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters; 

const createProps: mapper<SubmissionProps, OwnState> = (props: SubmissionProps): OwnState => {
  return { 
    isOpenDialog: false
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    isOpenDialog: false,
  })
};

const handlerCreators: HandleCreators<SubmissionProps, OwnHandler> = {
  handleDialogOpen: (props: SubmissionProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: SubmissionProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: SubmissionProps) => () => { 
    const { stateUpdate, formName, withSubmitDialog } = props;
    const { submitForm } = props.workflowApprovalDispatch;

    if (formName && withSubmitDialog) {
      stateUpdate({
        isOpenDialog: false
      });

      submitForm(formName);
    }
  },
};

export const Submission = compose<SubmissionProps, OwnProps>(
  injectIntl,
  withForm,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<SubmissionProps, OwnHandler>(handlerCreators)
)(SubmissionView);