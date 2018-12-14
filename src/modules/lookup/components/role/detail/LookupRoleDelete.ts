import { withForm, WithForm } from '@layout/hoc/withForm';
import { RoleUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupRoleDeleteView } from './LookupRoleDeleteView';

const formName = 'lookupRoleDelete';

export type RoleDeleteFormData = {
  uid: string | null | undefined;
};

interface OwnProps {
  action: RoleUserAction | undefined;
  isOpenDialog: boolean;
  fullScreen?: boolean | false;
  title?: string;
  content?: string;
  labelCancel?: string;
  labelConfirm?: string;
  handleDialogOpen: (action: RoleUserAction) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnHandler {
  handleDeleteConfirmed: () => void;
}

interface OwnStateUpdaters extends StateHandlerMap<{}> {
  stateUpdate: StateHandler<{}>;
}

export type RoleDeleteProps
  = WithForm
  & InjectedFormProps<RoleDeleteFormData, {}>
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

const handlerCreators: HandleCreators<RoleDeleteProps, OwnHandler> = {
  handleDeleteConfirmed: (props: RoleDeleteProps) => () => { 
    const { stateUpdate } = props;
    const { submitForm } = props.submitDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const enhance = compose<RoleDeleteProps, OwnProps & InjectedFormProps<RoleDeleteFormData, OwnProps>>(
  withForm,
  injectIntl,
  withStateHandlers<{}, OwnStateUpdaters, {}>({}, stateUpdaters), 
  withHandlers<RoleDeleteProps, OwnHandler>(handlerCreators)
)(LookupRoleDeleteView);

export const LookupRoleDelete = reduxForm<RoleDeleteFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);