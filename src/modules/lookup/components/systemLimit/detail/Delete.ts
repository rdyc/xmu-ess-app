import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { withForm, WithForm } from '@layout/hoc/withForm';
import { DeleteView } from './DeleteView';

const formName = 'DeleteLookup';

export type DeleteFormData = {
  uid: string | null | undefined;
};

interface OwnProps {
  fullScreen?: boolean | false;
  title?: string;
  content?: string;
  labelCancel?: string;
  labelConfirm?: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
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

export type DeleteProps
  = WithForm
  & InjectedFormProps<DeleteFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<DeleteProps, OwnState> = (): OwnState => {
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

const handlerCreator: HandleCreators<DeleteProps, OwnHandler> = {
  handleDialogOpen: (props: DeleteProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: true
    });
  },
  handleDialogClose: (props: DeleteProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false
    });
  },
  handleDialogConfirmed: (props: DeleteProps) => () => {
    const { stateUpdate } = props;
    const { submitForm } = props.submitDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const enhance = compose<DeleteProps, OwnProps & InjectedFormProps<DeleteFormData, OwnProps>>(
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<DeleteProps, OwnHandler>(handlerCreator)
)(DeleteView);

export const Delete = reduxForm<DeleteFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);