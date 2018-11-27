import { FormMode } from '@generic/types';
import { InjectedIntlProps } from 'react-intl';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { CurrencyFormView } from './CurrencyFormView';

const formName = 'lookupCurrency';

export type CurrencyFormData = {
  // uid: string | null | undefined,
  symbol: string | null | undefined,
  name: string | null | undefined,
  rate: number | undefined,
  isActive: boolean | null | undefined,
};

interface OwnProps {
  formMode: FormMode;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type CurrencyFormProps
  = InjectedFormProps<CurrencyFormData, OwnProps>
  & InjectedIntlProps
  & OwnHandlers
  & OwnProps;

export const CurrencyForm = reduxForm<CurrencyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(CurrencyFormView);