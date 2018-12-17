import { withForm, WithForm } from '@layout/hoc/withForm';
import { CompanyUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupCompanyDeleteView } from './LookupCompanyDeleteView';

const formName = 'lookupCompanyDelete';

export type CompanyDeleteFormData = {
  uid: string | null | undefined;
};

interface OwnProps {
  action: CompanyUserAction | undefined;
  isOpenDialog: boolean;
  fullScreen?: boolean | false;
  title?: string;
  content?: string;
  labelCancel?: string;
  labelConfirm?: string;
  handleDialogOpen: (action: CompanyUserAction) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnHandler {
  handleDeleteConfirmed: () => void;
}

interface OwnStateUpdaters extends StateHandlerMap<{}> {
  stateUpdate: StateHandler<{}>;
}

export type CompanyDeleteProps
  = WithForm
  & InjectedFormProps<CompanyDeleteFormData, {}>
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

const handlerCreators: HandleCreators<CompanyDeleteProps, OwnHandler> = {
  handleDeleteConfirmed: (props: CompanyDeleteProps) => () => { 
    const { stateUpdate } = props;
    const { submitForm } = props.submitDispatch;

    stateUpdate({
      isOpenDialog: false
    });

    submitForm(formName);
  },
};

const enhance = compose<CompanyDeleteProps, OwnProps & InjectedFormProps<CompanyDeleteFormData, OwnProps>>(
  withForm,
  injectIntl,
  withStateHandlers<{}, OwnStateUpdaters, {}>({}, stateUpdaters), 
  withHandlers<CompanyDeleteProps, OwnHandler>(handlerCreators)
)(LookupCompanyDeleteView);

export const LookupCompanyDelete = reduxForm<CompanyDeleteFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);