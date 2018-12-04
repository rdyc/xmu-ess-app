import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { LookupLeaveDetailFormView } from '@lookup/components/leave/editor/forms/LookupLeaveDetailFormView';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type RequestDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RequestDetailFormProps) => (name: string) => { 
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
      
      case 'categoryType':
        fieldProps = {
          required: true,
          category: 'leave',
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
        };
        break;

      case 'year':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber,
        };
        break;
      
      case 'name': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: InputText,
        };
        break;

      case 'allocation': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber,
        };
        break;

        case 'isWithinHoliday':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.ActiveStatus),
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.leave.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupLeaveDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupLeaveDetailFormView);