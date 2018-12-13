import { withForm, WithForm } from '@layout/hoc/withForm';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { DeleteView } from './DeleteView';

const formName = 'lookupDelete';

export type DeleteFormData = {
  uid: string | null | undefined;
};

interface OwnProps {
  action: SystemLimitUserAction | undefined;
  isOpenDialog: boolean;
  fullScreen?: boolean | false;
  title?: string;
  content?: string;
  labelCancel?: string;
  labelConfirm?: string;
  handleDialogOpen: (action: SystemLimitUserAction) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnHandler {
  handleDeleteConfirmed: () => void;
}

interface OwnStateUpdaters extends StateHandlerMap<{}> {
  stateUpdate: StateHandler<{}>;
}

export type DeleteProps
  = WithForm
  & InjectedFormProps<DeleteFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnStateUpdaters;

const stateUpdaters: StateUpdaters<{}, {}, OwnStateUpdaters> = {
  stateUpdate: (prevState: {}) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<DeleteProps, OwnHandler> = {
  handleDeleteConfirmed: (props: DeleteProps) => () => { 
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
  withStateHandlers<{}, OwnStateUpdaters, {}>({}, stateUpdaters), 
  withHandlers<DeleteProps, OwnHandler>(handlerCreators)
)(DeleteView);

export const Delete = reduxForm<DeleteFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);