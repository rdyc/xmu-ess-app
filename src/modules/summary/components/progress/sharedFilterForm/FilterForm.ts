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
import { isNullOrUndefined } from 'util';
import { FilterFormView } from './FilterFormView';

const formName = 'Filter';

export type FilterFormData = {
  customerUid: string | null ;
  projectUid: string | null;
};

interface FormValueProps {
  customerUidValue: string;
}

interface OwnProps {
  onProjectSelected: (customerUid: string, projectUid: string) => void;
}

interface OwnHandler {
  handleChangeCustomer: (event: any, newValue: string, oldValue: string) => void;
  handleChangeProject: (event: any, newValue: string, oldValue: string) => void;
}

interface OwnState {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type FilterFormProps 
  = WithForm
  & InjectedFormProps<FilterFormData, {}>
  & InjectedIntlProps
  & OwnProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;
  
const createProps: mapper<FilterFormProps, OwnState> = (props: FilterFormProps): OwnState => {
  return { 
    isOpenDialog: false
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<FilterFormProps, OwnHandler> = {
  handleChangeCustomer: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { change } = props;

    if (!isNullOrUndefined(oldValue)) {
      change('projectUid', '');
    }
  },
  handleChangeProject: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { customerUidValue, onProjectSelected  } = props;

    onProjectSelected(customerUidValue, newValue);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const customerUid = selector(state, 'customerUid');
  
  return {
    customerUidValue: customerUid,
  };
};

const enhance = compose<FilterFormProps, OwnProps & InjectedFormProps<FilterFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<FilterFormProps, OwnHandler>(handlerCreators)
)(FilterFormView);

export const FilterForm = reduxForm<FilterFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);