import { FormMode } from '@generic/types';
import { CheckBox } from '@layout/components/input/checkBox';
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
    
    const fieldName = name.replace('information.', '');

    let fieldProps: any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.uid),
          component: InputText
        };
        break;

      case 'name':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.name),
          placeholder: props.intl.formatMessage(lookupMessage.currency.field.namePlaceholder),
          component: InputText
        };
        break;

      case 'symbol':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.symbol),
          placeholder: props.intl.formatMessage(lookupMessage.currency.field.symbolPlaceholder),
          component: InputText
        };
        break;

      case 'rate':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(lookupMessage.currency.field.rate),
          placeholder: props.intl.formatMessage(lookupMessage.currency.field.ratePlaceholder),
          component: InputNumber,
        };
        break;

      case 'isActive':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.ActiveStatus),
          component: CheckBox,
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