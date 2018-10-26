import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
// import { FieldInputLeave } from '@layout/components/formFields/FieldInputLeave';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { LeaveRequestDetailFormView } from '@leave/components/request/editor/forms/LeaveRequestDetailFormView';
import { InputLeave } from '@lookup/components/leave/input';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  formRegularType: string | null | undefined;
  isRegularType: boolean;
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
      intl, formMode, isRegularType
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
          required: false,
          disabled: !isRegularType,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: isRegularType ? InputLeave : InputText,
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
          disabled: isRegularType,
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
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
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

export const LeaveRequestDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(LeaveRequestDetailFormView);