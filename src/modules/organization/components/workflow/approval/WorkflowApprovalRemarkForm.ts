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

import { WorkflowApprovalRemarkFormView } from './WorkflowApprovalRemarkFormView';

const formName = 'workflowApproval';

export type WorkflowApprovalRemarkFormData = {
  isApproved?: string;
  remark?: string;
};

interface FormValueProps {
  formIsApproved?: string;
  remarkToogle?: boolean;
}

interface OwnProps {
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogFullScreen?: boolean | false;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
  approvalOptionalRemarkLabel?: string;
  approvalOptionalRemarkPlaceholder?: string;
  approvalRemarkLabel?: string;
  approvalRemarkPlaceholder?: string;
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

export type WorkflowApprovalRemarkFormProps 
  = WithForm
  & InjectedFormProps<WorkflowApprovalRemarkFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;
  
const createProps: mapper<WorkflowApprovalRemarkFormProps, OwnState> = (props: WorkflowApprovalRemarkFormProps): OwnState => {
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

const handlerCreators: HandleCreators<WorkflowApprovalRemarkFormProps, OwnHandler> = {
  handleDialogOpen: (props: WorkflowApprovalRemarkFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: WorkflowApprovalRemarkFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: WorkflowApprovalRemarkFormProps) => () => { 
    const { stateUpdate } = props;
    const { submitForm } = props.workflowApprovalDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any, props: WorkflowApprovalRemarkFormProps): FormValueProps => {
  const isApproved = selector(state, 'isApproved');
  
  return {
    formIsApproved: isApproved,
    remarkToogle: isApproved === props.approvalTrueValue
  };
};

const enhance = compose<WorkflowApprovalRemarkFormProps, OwnProps & InjectedFormProps<WorkflowApprovalRemarkFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<WorkflowApprovalRemarkFormProps, OwnHandler>(handlerCreators)
)(WorkflowApprovalRemarkFormView);

export const WorkflowApprovalRemarkForm = reduxForm<WorkflowApprovalRemarkFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);