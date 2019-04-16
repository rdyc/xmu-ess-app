import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithStyles, withStyles } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import * as Yup from 'yup';

import { WorkflowApprovalFormView } from './WorkflowApprovalFormView';

interface ISubmissionDialogProps {
  fullScreen?: boolean;
  title: string;
  message: string;
  labelCancel: string;
  labelConfirm: string;
}

interface IWorkflowApprovalRemarkFieldProps {
  label: string;
  placeholder: string;
}

export interface IWorkflowApprovalFormValue {
  statusType: string;
  remark: string;
}

interface IOwnOption {
  title: string;
  statusTypes: RadioGroupChoice[];
  trueTypes: string[];
  disabled?: boolean;
  remarkFieldProps?: IWorkflowApprovalRemarkFieldProps;
  confirmationDialogProps: ISubmissionDialogProps;
  onSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

interface IOwnState {
  isOpenDialog: boolean;
  initialValues: IWorkflowApprovalFormValue;
  validationSchema: Yup.ObjectSchema<Yup.Shape<{}, Partial<IWorkflowApprovalFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
}

export type WorkflowApprovalFormProps
  = WithMasterPage
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<WorkflowApprovalFormProps, IOwnState> = (props: WorkflowApprovalFormProps): IOwnState => ({
  // form values
  isOpenDialog: false,
  initialValues: {
    statusType: '',
    remark: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IWorkflowApprovalFormValue>>({
    statusType: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.workflow.field.statusType))
      .required(),

    remark: Yup.string()
      .label(props.remarkFieldProps && props.remarkFieldProps.label || props.intl.formatMessage(organizationMessage.workflow.field.remark))
      .when('statusType', {
        is: (value: string) => props.trueTypes.indexOf(value) === -1,
        then: Yup.string()
          .max(200)
          .required()
      })
  })
});

const stateUpdaters: StateUpdaters<WorkflowApprovalFormProps, IOwnState, IOwnStateUpdater> = {
  setOpen: (prevState: IOwnState) => () => ({
    isOpenDialog: !prevState.isOpenDialog,
  })
};

export const WorkflowApprovalForm = compose<WorkflowApprovalFormProps, IOwnOption>(
  setDisplayName('WorkflowApprovalForm'),
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withStyles(styles)
)(WorkflowApprovalFormView);