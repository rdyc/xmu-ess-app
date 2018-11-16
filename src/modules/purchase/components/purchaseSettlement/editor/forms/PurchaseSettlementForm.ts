import { FormMode } from '@generic/types';
import { PurchaseSettlementFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementFormView';
import { connect } from 'react-redux';
import { formValueSelector, 
  getFormValues, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'purchaseSettlement';

export type PurchaseSettlementItemFormData = {
  uid: string;
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
}

interface FormValueProps {
  formIsCurrencyIDR: boolean | false;
  formRate: number | 1;
  formActualValue: number | 0;
  formDifferenceValue: number | 0;
  formActual: number | 0;
  formDifference: number | 0;
}

export type PurchaseSettlementFormProps
  = InjectedFormProps<PurchaseSettlementFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const actValue = selector(state, 'information.actual'); 
  const difValue = selector(state, 'information.difference'); 
  const forms = getFormValues(formName)(state) as PurchaseSettlementFormData;

  let actual: number = 0;
  let difference: number = 0;

  if (forms.items) {
    forms.items.items.forEach(item => actual += item.actual);
    forms.items.items.forEach(item => difference += item.variance);
  }

  return {
    formIsCurrencyIDR: currencyType === 'SCR01',
    formRate: rate,
    formActualValue: actValue,
    formDifferenceValue: difValue,
    formActual: actual,
    formDifference: difference
  };
};

const connectedView = connect(mapStateToProps)(PurchaseSettlementFormView);

export const PurchaseSettlementForm = reduxForm<PurchaseSettlementFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(connectedView);