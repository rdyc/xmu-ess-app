import { withForm, WithForm } from '@layout/hoc/withForm';
import { PositionUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { DeleteFormView } from './DeleteFormView';

const formName = 'lookupDelete';

export type DeleteFormData = {
  uid: string | null | undefined;
};

interface OwnProps {
  action: PositionUserAction | undefined;
  isOpenDialog: boolean;
  fullScreen?: boolean | false;
  title?: string;
  content?: string;
  labelCancel?: string;
  labelConfirm?: string;
  handleDialogOpen: (action: PositionUserAction) => void;
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
)(DeleteFormView);

export const DeleteForm = reduxForm<DeleteFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);