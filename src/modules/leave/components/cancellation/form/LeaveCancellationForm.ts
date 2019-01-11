import { WithCancellationForm, withCancellationForm } from '@layout/hoc/withCancellationForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
import { LeaveCancellationFormView } from './LeaveCancellationFormView';

const formName = 'leaveCancellation';

export type LeaveCancellationFormData = {
  cancelDate?: string;
};

interface OwnProps {
  cancellationTitle: string;
  cancellationSubHeader: string;
  cancellationDialogFullScreen?: boolean | false;
  cancellationDialogTitle: string;
  cancellationDialogContentText: string;
  cancellationDialogCancelText: string;
  cancellationDialogConfirmedText: string;
  cancellationCancelDateLabel?: string;
  cancellationCancelDatePlaceholder?: string;
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
  = WithCancellationForm
  & InjectedFormProps<LeaveCancellationFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;
  
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
    const { submitForm } = props.leaveCancellationDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const enhance = compose<LeaveCancellationFormProps, OwnProps & InjectedFormProps<LeaveCancellationFormData, OwnProps>>(
  withCancellationForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<LeaveCancellationFormProps, OwnHandler>(handlerCreators)
)(LeaveCancellationFormView);

export const LeaveCancellationForm = reduxForm<LeaveCancellationFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);