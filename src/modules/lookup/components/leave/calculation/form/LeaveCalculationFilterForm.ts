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
import { LeaveCalculationFilterFormView } from './LeaveCalculationFilterFormView';

const formName = 'Filter';

export type FilterFormData = {
  companyUid: string | null ;
  year: string | null;
};

interface FormValueProps {
  companyUidValue: string;
}

interface OwnProps {
  onYearSelected: (companyUid: string, year: string) => void;
}

interface OwnHandler {
  handleChangeCompany: (event: any, newValue: string, oldValue: string) => void;
  handleChangeYear: (event: any, newValue: string, oldValue: string) => void;
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
  handleChangeCompany: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { change } = props;

    if (!isNullOrUndefined(oldValue)) {
      change('year', '');
    }
  },
  handleChangeYear: (props: FilterFormProps) => (event: any, newValue: string, oldValue: string) => {
    const { companyUidValue, onYearSelected  } = props;

    onYearSelected(companyUidValue, newValue);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'companyUid');
  
  return {
    companyUidValue: companyUid,
  };
};

const enhance = compose<FilterFormProps, OwnProps & InjectedFormProps<FilterFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<FilterFormProps, OwnHandler>(handlerCreators)
)(LeaveCalculationFilterFormView);

export const LeaveCalculationFilterForm = reduxForm<FilterFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);