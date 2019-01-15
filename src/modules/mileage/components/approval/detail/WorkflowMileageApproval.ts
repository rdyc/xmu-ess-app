import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { isNullOrUndefined } from 'util';

import { WorkflowMileageApprovalView } from './WorkflowMileageApprovalView';

const formName = 'workflowMileageApproval';

export type WorkflowApprovalMileageFormData = {
  items?: IMileageApprovalPostItem[];
  isApproved?: string;
  remark?: string;
};

interface FormValueProps {
  formIsApproved?: boolean;
}

interface OwnProps {
  itemTrue: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogFullScreen?: boolean;
  approvalDialogTitle?: string;
  approvalDialogContentText?: string;
  approvalDialogCancelText?: string;
  approvalDialogConfirmedText?: string;
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

export type WorkflowApprovalMileageFormProps
  = WithMileageApproval
  & InjectedFormProps<WorkflowApprovalMileageFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;

const createProps: mapper<WorkflowApprovalMileageFormProps, OwnState> = (props: WorkflowApprovalMileageFormProps): OwnState => {
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
    isOpenDialog: false
  })
};

const handlerCreator: HandleCreators<WorkflowApprovalMileageFormProps, OwnHandler> = {
  handleDialogOpen: (props: WorkflowApprovalMileageFormProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: WorkflowApprovalMileageFormProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: WorkflowApprovalMileageFormProps) => () => {
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
    formIsApproved: isNullOrUndefined(isApproved) ? undefined : isApproved === WorkflowStatusType.Approved
  };
};

const enhance = compose<WorkflowApprovalMileageFormProps, OwnProps & InjectedFormProps<WorkflowApprovalMileageFormData, OwnProps>>(
  connect(mapStateToProps),
  withMileageApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<WorkflowApprovalMileageFormProps, OwnHandler>(handlerCreator)
)(WorkflowMileageApprovalView);

export const WorkflowMileageApproval = reduxForm<WorkflowApprovalMileageFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);