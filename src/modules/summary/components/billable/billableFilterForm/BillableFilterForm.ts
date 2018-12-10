import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
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
import { BillableFilterFormView } from './BillableFilterFormView';

const formName = 'BillableFilter';

export type BillableFilterFormData = {
  employeeUid: string | null;
  start: string | null;
  end: string | null;
};

interface FormValueProps {
  employeeUidValue: string | undefined;
  startValue: string | undefined;
  endValue: string | undefined;
}

interface OwnState {
  employeeUid?: string | undefined;
  start: string;
  end: string;
}

interface OwnProps {
  onFilterChange: (employeeUid: string | undefined, start: string | undefined, end: string | undefined) => void;
}

interface OwnHandler {
  handleChangeEmployee: (event: any, newValue: string, oldValue: string) => void;
  handleChangeStart: (event: any, newValue: string, oldValue: string) => void;
  handleChangeEnd: (event: any, newValue: string, oldValue: string) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type BillableFilterFormProps
  = WithForm
  & InjectedFormProps<BillableFilterFormData, OwnState>
  & InjectedIntlProps
  & OwnHandler
  & OwnProps
  & OwnState
  & WithUser
  & OwnStateUpdaters
  & FormValueProps;

const createProps: mapper<BillableFilterFormProps, OwnState> = (props: BillableFilterFormProps): OwnState => {
  return {
    start: moment()
      .startOf('year')
      .toISOString(true),
    end: moment().toISOString(true),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: OwnState) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<BillableFilterFormProps, OwnHandler> = {
  handleChangeEmployee: (props: BillableFilterFormProps) => (event: any, newValue: string) => {
    const { onFilterChange, start, end } = props;

    onFilterChange(newValue, start, end);
  },
  handleChangeStart: (props: BillableFilterFormProps) => (event: any, newValue: string) => {
    const { onFilterChange, employeeUid, end } = props;

    onFilterChange(employeeUid, newValue, end);
  },
  handleChangeEnd: (props: BillableFilterFormProps) => (event: any, newValue: string) => {
    const { onFilterChange, employeeUid, start } = props;

    onFilterChange(employeeUid, start, newValue);
  }
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const employeeUid = selector(state, 'employeeUid');
  const start = selector(state, 'start');
  const end = selector(state, 'end');
  
  return {
    employeeUidValue: employeeUid,
    startValue: start,
    endValue: end
  };
};

const enhance = compose<BillableFilterFormProps, OwnProps & InjectedFormProps<BillableFilterFormData, OwnProps>>(
  connect(mapStateToProps),
  withUser,
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<BillableFilterFormProps, OwnHandler>(handlerCreators)
)(BillableFilterFormView);

export const BillableFilterForm = reduxForm<BillableFilterFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);