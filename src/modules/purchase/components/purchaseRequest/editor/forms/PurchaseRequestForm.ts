import { FormMode } from '@generic/types';
import { PurchaseRequestFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestFormView';
import { connect } from 'react-redux';
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
    request: number;
  },
  items:  {
   items: PurchaseRequestItemFormData[];
  }
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formCustomer: string | null;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | null;
  formRate: number | 1;
  formValue: number | 1;
  formItems: any;
  formValues: PurchaseRequestFormData;
  formRequest: number | 0;
}

export type PurchaseRequestFormProps
  = InjectedFormProps<PurchaseRequestFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const customer = selector(state, 'information.customerUid');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const value = selector(state, 'information.request'); 
  const itemsValue = selector(state, 'items.items');
  const forms = getFormValues(formName)(state) as PurchaseRequestFormData;

  let request: number = 0;
  if (forms.items) {
    forms.items.items.forEach(item => request += item.request);
  }

  return {
    formCustomer: customer,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValue: value,
    formItems: itemsValue,
    formValues: forms,
    formRequest: request,
  };
};

// const enhancedView = compose<PurchaseRequestFormProps, OwnProps & InjectedFormProps<PurchaseRequestFormData, OwnProps>>(
//   connect(mapStateToProps),
// )(PurchaseRequestFormView);

const connectedView = connect(mapStateToProps)(PurchaseRequestFormView);

export const PurchaseRequestForm = reduxForm<PurchaseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values: PurchaseRequestFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('PURCHASE_FORM', { detail: values }));
  },
})(connectedView);
// })(enhancedView);