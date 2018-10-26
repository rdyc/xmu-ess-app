import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithForm, withForm } from '@layout/hoc/withForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
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
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { isNullOrUndefined } from 'util';

import { WorkflowApprovalFormView } from './WorkflowApprovalFormView';

const formName = 'workflowApproval';

export type WorkflowApprovalFormData = {
  isApproved: string | null | undefined;
  remark: string | null;
};

interface FormValueProps {
  formIsApproved: boolean | undefined;
}

interface OwnProps {
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogFullScreen?: boolean | false;
  approvalDialogTitle?: string | undefined;
  approvalDialogContentText?: string | undefined;
  approvalDialogCancelText?: string | undefined;
  approvalDialogConfirmedText?: string | undefined;
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

export type WorkflowApprovalFormProps 
  = WithForm
  & InjectedFormProps<WorkflowApprovalFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;
  
const createProps: mapper<WorkflowApprovalFormProps, OwnState> = (props: WorkflowApprovalFormProps): OwnState => {
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

const handlerCreators: HandleCreators<WorkflowApprovalFormProps, OwnHandler> = {
  handleDialogOpen: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: WorkflowApprovalFormProps) => () => { 
    const { stateUpdate } = props;
    const { submitForm } = props.workflowApprovalDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const isApproved = selector(state, 'isApproved');
  
  return {
    formIsApproved: isNullOrUndefined(isApproved) ? undefined : isApproved === WorkflowStatusType.Approved,
  };
};

const enhance = compose<WorkflowApprovalFormProps, OwnProps & InjectedFormProps<WorkflowApprovalFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<WorkflowApprovalFormProps, OwnHandler>(handlerCreators)
)(WorkflowApprovalFormView);

export const WorkflowApprovalForm = reduxForm<WorkflowApprovalFormData, OwnProps>({
  form: formName
})(enhance);