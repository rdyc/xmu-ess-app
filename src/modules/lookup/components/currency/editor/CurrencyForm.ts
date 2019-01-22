import { FormMode } from '@generic/types';
import { InjectedIntlProps } from 'react-intl';
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
}

export type CurrencyFormProps
  = InjectedFormProps<CurrencyFormData, OwnProps>
  & InjectedIntlProps
  & OwnProps;

export const CurrencyForm = reduxForm<CurrencyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(CurrencyFormView);