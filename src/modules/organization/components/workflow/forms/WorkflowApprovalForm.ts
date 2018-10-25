import { WithForm, withForm } from '@layout/hoc/withForm';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { WorkflowApprovalFormView } from './WorkflowApprovalFormView';

const formName = 'workflowApproval';

export type WorkflowApprovalFormData = {
  isApproved: boolean | null | undefined;
  remark: string | null;
};

interface OwnHandler {
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type WorkflowApprovalFormProps 
  = WithForm
  & InjectedFormProps<WorkflowApprovalFormData, {}>
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;
  
const createProps: mapper<WorkflowApprovalFormProps, OwnState> = (props: WorkflowApprovalFormProps): OwnState => ({ 
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const handlerCreators: HandleCreators<WorkflowApprovalFormProps, OwnHandler> = {
  handleDialogOpen: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      dialogOpen: true
    });
  },
  handleDialogClose: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      dialogOpen: false
    });
  },
  handleDialogConfirmed: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;
    const { submitForm } = props.workflowApprovalDispatch;

    stateUpdate({
      dialogOpen: false
    });

    submitForm(formName);
  },
};

const enhance = compose<WorkflowApprovalFormProps, InjectedFormProps<WorkflowApprovalFormData>>(
  withForm,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<WorkflowApprovalFormProps, OwnHandler>(handlerCreators)
)(WorkflowApprovalFormView);

export const WorkflowApprovalForm = reduxForm<WorkflowApprovalFormData, {}>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(enhance);