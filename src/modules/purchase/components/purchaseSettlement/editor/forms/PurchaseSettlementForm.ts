import { FormMode } from '@generic/types';
import { PurchaseSettlementFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementFormView';
import { connect } from 'react-redux';
import { formValueSelector, 
  // getFormValues, 
  InjectedFormProps, reduxForm } from 'redux-form';

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
  formValue: number | 1;
  formItem: number | undefined;
}

export type PurchaseSettlementFormProps
  = InjectedFormProps<PurchaseSettlementFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const value = selector(state, 'information.actual'); 
  const itemValue = selector(state, 'items.requestValue');
  return {
    formIsCurrencyIDR: currencyType === 'SCR01',
    formRate: rate,
    formValue: value,
    formItem: itemValue
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