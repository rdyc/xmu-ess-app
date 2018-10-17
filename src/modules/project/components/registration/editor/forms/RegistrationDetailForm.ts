import {
  RegistrationDetailFormView,
} from '@project/components/registration/editor/forms/RegistrationDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  context: BaseFieldsProps;
  formCurrencyType: string | null | undefined;
  isCurrencyIdr: boolean;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
}

export type RegistrationDetailFormProps 
  = OwnProps 
  & InjectedIntlProps;

export const RegistrationDetailForm = compose<RegistrationDetailFormProps, OwnProps>(
  injectIntl
)(RegistrationDetailFormView);