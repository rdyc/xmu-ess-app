import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { CurrencyDetailFormView } from './CurrencyDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type CurrencyDetailFormProps
  = OwnProps
  // & WithUser
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<CurrencyDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: CurrencyDetailFormProps) => (name: string) => {
    
    const fieldName = name.replace('information.', '');

    let fieldProps: any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText
        };
        break;

      case 'name':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText
        };
        break;

      case 'symbol':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText
        };
        break;

      case 'rate':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText
        };
        break;

      case 'rate':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(lookupMessage.currency.field.rate),
          placeholder: props.intl.formatMessage(lookupMessage.currency.field.ratePlaceholder),
          component: InputNumber,
          disabled: true
        };
        break;
        
        default:
        fieldProps = {
          type: 'text',
          label: props.intl.formatMessage({ id: `lookup.currency.field.${name}` }),
          placeholder: props.intl.formatMessage({ id: `lookup.currency.field.${name}.placeholder` }),
          component: InputText
        };
        break;
      }

    return fieldProps;
    }
  };

export const CurrencyDetailForm = compose<CurrencyDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<CurrencyDetailFormProps, OwnHandlers>(handlerCreators),
)(CurrencyDetailFormView);