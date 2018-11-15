import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  employeeUid: string | null ;
  projectUid: string | null;
};

interface FormValueProps {
  employeeUidValue: string;
  projectUidValue: string | undefined;
}

interface OwnProps {
  onFilterChange: (customerUid: string, projectUid: string | undefined) => void;
}

interface OwnHandler {
  handleChangeEmployee: (event: any, newValue: string, oldValue: string) => void;
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
  & WithUser
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
  handleChangeEmployee: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { change, onFilterChange } = props;

    if (!isNullOrUndefined(oldValue)) {
      change('projectUid', '');
    }

    onFilterChange(newValue, undefined);
  },
  handleChangeProject: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { employeeUidValue, onFilterChange  } = props;

    onFilterChange(employeeUidValue, newValue);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const employeeUid = selector(state, 'employeeUid');
  const projectUid = selector(state, 'projectUid');
  
  return {
    employeeUidValue: employeeUid,
    projectUidValue: projectUid,
  };
};

const enhance = compose<FilterFormProps, OwnProps & InjectedFormProps<FilterFormData, OwnProps>>(
  connect(mapStateToProps),
  withUser,
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<FilterFormProps, OwnHandler>(handlerCreators)
)(FilterFormView);

export const FilterForm = reduxForm<FilterFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);