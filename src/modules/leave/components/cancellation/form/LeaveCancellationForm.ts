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
import { LeaveCancellationFormView } from './LeaveCancellationFormView';

const formName = 'leaveCancellation';

export type LeaveCancellationFormData = {
  cancelDate: string | null | undefined;
};

interface FormValueProps {
  formIsApproved: string | undefined;
}

interface OwnProps {
  cancellationTitle: string;
  cancellationSubHeader: string;
  cancellationDialogFullScreen?: boolean | false;
  cancellationDialogTitle: string;
  cancellationDialogContentText: string;
  cancellationDialogCancelText: string;
  cancellationDialogConfirmedText: string;
  cancellationRemarkLabel?: string;
  cancellationRemarkPlaceholder?: string;
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

export type LeaveCancellationFormProps 
  = WithForm
  & InjectedFormProps<LeaveCancellationFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;
  
const createProps: mapper<LeaveCancellationFormProps, OwnState> = (props: LeaveCancellationFormProps): OwnState => {
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

const handlerCreators: HandleCreators<LeaveCancellationFormProps, OwnHandler> = {
  handleDialogOpen: (props: LeaveCancellationFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: LeaveCancellationFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: LeaveCancellationFormProps) => () => { 
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
    formIsApproved: isApproved,
  };
};

const enhance = compose<LeaveCancellationFormProps, OwnProps & InjectedFormProps<LeaveCancellationFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<LeaveCancellationFormProps, OwnHandler>(handlerCreators)
)(LeaveCancellationFormView);

export const LeaveCancellationForm = reduxForm<LeaveCancellationFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);