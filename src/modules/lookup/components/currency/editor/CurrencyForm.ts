import { FormMode } from '@generic/types';
import { InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { CurrencyFormView } from './CurrencyFormView';

const formName = 'lookupCurrency';

export type CurrencyFormData = {
  information: {
    uid: string | undefined,
    symbol: string | undefined,
    name: string | undefined,
    rate: number | undefined,
    isActive: boolean  | undefined,
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}
interface FormValueProps {
  formName: string;
}

export type CurrencyFormProps
  = InjectedFormProps<CurrencyFormData, OwnProps>
  & InjectedIntlProps
  & OwnProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(CurrencyFormView);

export const CurrencyForm = reduxForm<CurrencyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);