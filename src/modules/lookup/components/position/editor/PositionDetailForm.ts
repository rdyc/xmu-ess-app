import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { PositionDetailFormView } from './PositionDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type PositionDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<PositionDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: PositionDetailFormProps) => (name: string) => {
    
    // const fieldName = name.replace('information.', '');

    let fieldProps: any = {};

    // switch (fieldName) {
    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(lookupMessage.position.field.uid),
          component: InputText,
        };
        break;

      case 'name':
        fieldProps = {
          type: 'text',
          required: true,
          label: props.intl.formatMessage(lookupMessage.position.field.name),
          placeholder: props.intl.formatMessage(lookupMessage.position.field.namePlaceholder),
          component: InputText
        };
        break;

      case 'description':
        fieldProps = {
          type: 'text',
          label: props.intl.formatMessage(lookupMessage.position.field.description),
          placeholder: props.intl.formatMessage(lookupMessage.position.field.descriptionPlaceholder),
          component: InputText
        };
        break;

      case 'date':
        fieldProps = {
          type: 'number',
          required: true,
          label: props.intl.formatMessage(lookupMessage.position.field.inactiveDate),
          placeholder: props.intl.formatMessage(lookupMessage.position.field.inactiveDatePlaceholder),
          component: InputNumber,
        };
        break;

      case 'isAllowMultiple':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.position.field.isAllowMultiple),
        };
        break;
        
        default:
        fieldProps = {
          type: 'text',
          label: props.intl.formatMessage({ id: `lookup.position.field.${name}` }),
          placeholder: props.intl.formatMessage({ id: `lookup.position.field.${name}.placeholder` }),
          component: InputText
        };
        break;
      }

    return fieldProps;
    }
  };

export const PositionDetailForm = compose<PositionDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<PositionDetailFormProps, OwnHandlers>(handlerCreators),
)(PositionDetailFormView);