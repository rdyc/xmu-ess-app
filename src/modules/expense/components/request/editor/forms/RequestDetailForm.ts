import { WorkflowStatusType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { RequestDetailFormView } from '@expense/components/request/editor/forms/RequestDetailFormView';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { SelectProject } from '@project/components/select/project';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  customerUidValue: string | null | undefined;
  onChangeCustomer: (event: any, newValue: string, oldValue: string) => void;
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
        intl, customerUidValue, onChangeCustomer
      } = props;

      const projectFilter: any = {
        customerUids: customerUidValue,
        statusTypes: WorkflowStatusType.Approved,

      };
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {
        case 'uid': 
          fieldProps = {
            disabled: true,
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputText
          };
          break;

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
            component: InputCustomer,
            onChange: onChangeCustomer
          };
          break;
          
        case 'projectUid':
          fieldProps = {
            type: 'text',
            disabled: isNullOrUndefined(customerUidValue),
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: SelectProject,
            filter: projectFilter
          };
          break;
          
        case 'value':
          fieldProps = {
            type: 'number',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputNumber
          };
          break;        
      
        case 'notes':
          fieldProps = {
            multiline: true,
            type: 'text',
            placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
            component: InputText
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