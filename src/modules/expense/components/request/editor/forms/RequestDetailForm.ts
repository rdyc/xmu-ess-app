import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { RequestDetailFormView } from '@expense/components/request/editor/forms/RequestDetailFormView';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
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
        intl 
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {
        case 'uid':

        case 'date': 
          fieldProps = {
            type: 'text',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputDate
          };
          break;
        
        case 'expenseType':
          fieldProps = {
            category: 'expense',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: SelectSystem
          };
          break;
        
        case 'customerUid': 
          fieldProps = {
            type: 'text',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputCustomer
          };
          break;
          
        // case 'projectUid':
        //   fieldProps = {
        //     type: 'text',
        //     placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
        //     component: SelectProject
        //   };
        //   break;
          
        case 'value':
          fieldProps = {
            type: 'number',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputNumber
          };
          break;      
      
        default:
          fieldProps = {
            type: 'text',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
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