import { FormMode } from '@generic/types';
import { PurchaseRequestFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestFormView';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { formValueSelector, getFormValues, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'purchaseRequest';

export type PurchaseRequestItemFormData = {
  uid: string | null | undefined;
  description: string;
  request: number;
};

export type PurchaseRequestFormData = {
  information: {
    uid: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    advance: number;
    notes: string | null | undefined;
    date: string | null | undefined;
    currencyType: string | null | undefined;
    rate: number;
    request: number | 0;
  },
  items:  {
   items: PurchaseRequestItemFormData[];
  }
};

interface OwnProps {
  formMode: FormMode;
  initialForm?: PurchaseRequestFormData | undefined;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
}

interface OwnState {
  PurchaseForm?: PurchaseRequestFormData | undefined; 
  TotalRequest?: number | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setRequest: StateHandler<OwnState>;
}
interface FormValueProps {
  formCustomer: string | null;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | null;
  formRate: number | 1;
  // formValue: number | 0;
  formValues: PurchaseRequestFormData;
  formRequest: number | 0;
}

export type PurchaseRequestFormProps
  = InjectedFormProps<PurchaseRequestFormData, OwnProps>
  & FormValueProps
  & OwnHandlers
  & OwnProps
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PurchaseRequestFormProps, OwnState> = (props: PurchaseRequestFormProps): OwnState => {
  return {
    PurchaseForm: props.initialForm,
    // TotalRequest: props.formValue,
  };
};

const handlers: HandleCreators<PurchaseRequestFormProps, OwnHandlers> = {
  handleEventListener: (props: PurchaseRequestFormProps) => (event: CustomEvent) => {
    const { setRequest } = props;
    const formValues = event.detail as PurchaseRequestFormData;

    let total: number = 0;
    if (formValues.items.items) {
      formValues.items.items.forEach((item) => total += item.request);
    }
    setRequest(total);
  },
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const customer = selector(state, 'information.customerUid');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const value = selector(state, 'information.request'); 
  const forms = getFormValues(formName)(state) as PurchaseRequestFormData;

  return {
    formCustomer: customer,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValues: forms,
    formRequest: value,
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setRequest: (prevState: OwnState) => (total: number) => {
      return {
        ...prevState,
        initialForm: {
          ...prevState.PurchaseForm,
          request: total,
        }
        };
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('PURCHASE_FORM', this.props.handleEventListener);
  },
  // componentWillReceiveProps() {

  // },
  componentWillUnmount() {
    removeEventListener('PURCHASE_FORM', this.props.handleEventListener);
  }
};

const enhancedView = compose<PurchaseRequestFormProps, OwnProps & InjectedFormProps<PurchaseRequestFormData, OwnProps>>(
  connect(mapStateToProps),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlers),
  lifecycle(lifecycles),
)(PurchaseRequestFormView);

// const connectedView = connect(mapStateToProps)(PurchaseRequestFormView);

export const PurchaseRequestForm = reduxForm<PurchaseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values: PurchaseRequestFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('PURCHASE_FORM', { detail: values }));
  },
})(enhancedView);