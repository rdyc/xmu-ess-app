import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { RequestDetailFormView } from '@leave/components/request/editor/forms/RequestDetailFormView';
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

      case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: SelectSystem
        };
        break;
      
      case 'leaveType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'leave',
          disabled: formMode === FormMode.Edit,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: SelectSystem
        };
        break;

      case 'regularType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'regular',
          disabled: formMode === FormMode.Edit,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: SelectSystem
        };
        break;
      
      case 'start': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
      
      case 'address': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText
        };
        break;

      case 'contactNumber': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `laeave.field.${name}.placeholder`}),
          component: InputText
        };
        break;

      case 'reason': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText
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

export const RequestDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(RequestDetailFormView);