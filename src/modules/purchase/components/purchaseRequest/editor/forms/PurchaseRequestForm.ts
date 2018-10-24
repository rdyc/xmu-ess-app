import { FormMode } from '@generic/types';
import { PurchaseRequestFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'purchaseRequest';

export type PurchaseRequestItemFormData = {
  uid: string | null;
  descriptionn: string;
  request: number;
};

export type PurchaseRequestFormData = {
  information: {
    uid: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    dat: string | null | undefined;
    name: string | null | undefined;
    notes: string | null | undefined;
    date: string | null | undefined;
    currencyType: string | null | undefined;
    rate: number;
    Request: number;
    valueIdr: number;
  },
  items: {
    items: PurchaseRequestItemFormData[]
  }
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | null;
  formRate: number | 1;
  formValue: number | 1;
}

export type PurchaseRequestFormProps
  = InjectedFormProps<PurchaseRequestFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const valueUsd = selector(state, 'information.valueUsd');

  return {
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValue: valueUsd
  };
};

const connectedView = connect(mapStateToProps)(PurchaseRequestFormView);

export const PurchaseRequestForm = reduxForm<PurchaseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
