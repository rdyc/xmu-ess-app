import { FormMode } from '@generic/types';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { PurchaseRequestFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'purchaseRequest';

export type PurchaseRequestItemFormData = {
  uid?: string;
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
    requestInIDR: number | 0;
  },
  items: PurchaseRequestItemFormData[];
  // items:  {
  // }
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
  formCustomer: string | null;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | null;
  formRate: number | 1;  
  formRequest: number | 0;
  formName: string;
  requestMinDate?: any;
}

export type PurchaseRequestFormProps
  = InjectedFormProps<PurchaseRequestFormData, OwnProps>
  & InjectedIntlProps
  & WithUser
  & FormValueProps
  & OwnHandlers
  & OwnProps
  & OwnState;

const handlers: HandleCreators<PurchaseRequestFormProps, OwnHandlers> = {
  handleEventListener: (props: PurchaseRequestFormProps) => (event: CustomEvent) => {
    const formValues = event.detail as PurchaseRequestFormData;

    let total: number = 0;
    if (formValues.items) {
      formValues.items.forEach((item) => total += item.request);
    }
    props.change('information.request', total);
    props.change('information.requestInIDR', total * props.formRate);
  },
};

const selector = formValueSelector(formName);

const dateLimit = new Date();
dateLimit.setDate(dateLimit.getDate() - 7);

const mapStateToProps = (state: any): FormValueProps => {
  const customer = selector(state, 'information.customerUid');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const value = selector(state, 'information.request');
  const date = selector(state, 'information.date');
  const dateData = new Date(date);
  dateData.setDate(dateData.getDate() - 7);
  const dateFinal = dateData.toDateString();

  return {
    formName,
    formCustomer: customer,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formRequest: value,
    requestMinDate: date ? dateFinal : dateLimit
  };
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('PURCHASE_FORM', this.props.handleEventListener);
  },
  componentWillUnmount() {
    removeEventListener('PURCHASE_FORM', this.props.handleEventListener);
  }
};

const enhancedView = compose<PurchaseRequestFormProps, OwnProps & InjectedFormProps<PurchaseRequestFormData, OwnProps>>(
  connect(mapStateToProps),
  withUser,
  injectIntl,
  withHandlers(handlers),
  lifecycle(lifecycles),
)(PurchaseRequestFormView);

export const PurchaseRequestForm = reduxForm<PurchaseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  // enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values: PurchaseRequestFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('PURCHASE_FORM', { detail: values }));
  },
})(enhancedView);