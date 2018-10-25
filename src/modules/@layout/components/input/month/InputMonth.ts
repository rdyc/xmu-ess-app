import { InjectedIntlProps, injectIntl } from 'react-intl';

import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputMonthView } from './InputMonthView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  disabled: boolean;
}

export type InputMonthProps = OwnProps & InjectedIntlProps;

export const InputMonth = compose<InputMonthProps, OwnProps>(injectIntl)(
  InputMonthView
);
