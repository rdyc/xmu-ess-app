import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { InputDateWithValueView } from './InputDateWithValueView';

interface OwnProps { 
  label: string; 
  future?: boolean;
  val: string | undefined;
  isOpen: boolean;
  onSelected: (data: string) => void;
  onClose: () => void;
}

export type InputDateWithValueProps 
  = OwnProps
  & InjectedIntlProps;

export const InputDateWithValue = compose<InputDateWithValueProps, OwnProps>(
  injectIntl
)(InputDateWithValueView);