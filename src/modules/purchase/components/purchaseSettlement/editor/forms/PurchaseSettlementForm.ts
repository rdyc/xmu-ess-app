import { FormMode } from '@generic/types';
import { PurchaseSettlementFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementFormView';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { formValueSelector, 
  // getFormValues, 
  InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'purchaseSettlement';

export type PurchaseSettlementItemFormData = {
  uid: string | null | undefined;
  description: string | null;
  request: number;
  actual: number;
  variance: number;
};

export type PurchaseSettlementFormData = {
  information: {
    uid: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    advance: number;
    notes: string | null | undefined;
    date: string | null | undefined;
    currencyType: string | null | undefined;
    rate: number;
    request: number;
    actual: number;
    difference: number; 
    requestInIDR: number;
    actualInIDR: number;
    differenceInIDR: number; 
    balanceDue: number;
  },
  items:  {
   items: PurchaseSettlementItemFormData[];
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
}

interface OwnState {
}

interface FormValueProps {
  formIsCurrencyIDR: boolean | false;
  formRate: number | 1;
  formActualValue: number | 0;
  formDifferenceValue: number | 0;
  formAdvance: number | 0;
  formName: string;
  // settleMinDate: any;
}

export type PurchaseSettlementFormProps
  = InjectedFormProps<PurchaseSettlementFormData, OwnProps>
  & FormValueProps
  & OwnProps
  & OwnState
  & OwnHandlers;

const handlers: HandleCreators<PurchaseSettlementFormProps, OwnHandlers> = {
  handleEventListener: (props: PurchaseSettlementFormProps) => (event: CustomEvent) => {
    const formValues = event.detail as PurchaseSettlementFormData;

    let actual: number = 0;
    let difference: number = 0;

    if (formValues.items) {
      formValues.items.items.forEach(item => actual += item.actual);
      formValues.items.items.forEach(item => difference += (item.request - item.actual));
    }
    props.change('information.actual', actual);
    props.change('information.actualInIDR', actual * props.formRate);
    props.change('information.difference', difference >= 0 ? difference : difference * -1);
    props.change('information.differenceInIDR', difference >= 0 ? difference * props.formRate : difference * -1 * props.formRate );
    props.change('information.balanceDue', (props.formAdvance - actual) >= 0 ? (props.formAdvance - actual) : ((props.formAdvance - actual) * -1) );
  },
};

const selector = formValueSelector(formName);

// const dateLimit = new Date();
// dateLimit.setDate(dateLimit.getDate() - 7);

const mapStateToProps = (state: any): FormValueProps => {
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const actValue = selector(state, 'information.actual'); 
  const difValue = selector(state, 'information.difference'); 
  const advance = selector(state, 'information.advance');
  // const date = selector(state, 'information.date');
  // const dateData = new Date(date);
  // dateData.setDate(dateData.getDate() - 7);
  // const dateFinal = dateData.toDateString();

  return {
    formName,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formRate: rate,
    formActualValue: actValue,
    formDifferenceValue: difValue,
    formAdvance: advance,
    // settleMinDate: date ? dateFinal : dateLimit
  };
};

const lifecycles: ReactLifeCycleFunctions<PurchaseSettlementFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('SETTLEMENT_FORM', this.props.handleEventListener);
  },
  componentWillUnmount() {
    removeEventListener('SETTLEMENT_FORM', this.props.handleEventListener);
  }
};

const enhancedView = compose<PurchaseSettlementFormProps, OwnProps & InjectedFormProps<PurchaseSettlementFormData, OwnProps>>(
  connect(mapStateToProps),
  withHandlers(handlers),
  lifecycle(lifecycles),
)(PurchaseSettlementFormView);

export const PurchaseSettlementForm = reduxForm<PurchaseSettlementFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values: PurchaseSettlementFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('SETTLEMENT_FORM', { detail: values }));
  },
})(enhancedView);