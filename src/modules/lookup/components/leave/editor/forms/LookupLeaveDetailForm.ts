import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { LookupLeaveDetailFormView } from '@lookup/components/leave/editor/forms/LookupLeaveDetailFormView';
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
    const { 
      intl, formMode
    } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText
        };
        break;
      
      case 'categoryType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'category',
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;

      case 'year':
        fieldProps = {
          required: false,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputNumber,
        };
        break;
      
      case 'name': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText,
        };
        break;

      case 'allocation': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputNumber,
        };
        break;

      case 'isWithinHoliday': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText,
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
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