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
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<CurrencyDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: CurrencyDetailFormProps) => (name: string) => {

    let fieldProps: any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText,
        };
        break;

      case 'name':
        fieldProps = {
          type: 'text',
          required: true,
          label: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldName')),
          placeholder: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'symbol':
        fieldProps = {
          type: 'text',
          required: true,
          label: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldName')),
          placeholder: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'rate':
        fieldProps = {
          type: 'number',
          required: true,
          label: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldName')),
          placeholder: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber,
        };
        break;

      case 'isActive':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.ActiveStatus),
        };
        break;
        
        default:
        fieldProps = {
          type: 'text',
          label: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldName')),
          placeholder: props.intl.formatMessage(lookupMessage.currency.fieldFor(name, 'fieldRequired')),
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