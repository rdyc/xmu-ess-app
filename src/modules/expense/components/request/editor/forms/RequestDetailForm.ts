import { WorkflowStatusType } from '@common/classes/types';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { RequestDetailFormView } from '@expense/components/request/editor/forms/RequestDetailFormView';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { SelectProject } from '@project/components/select/project';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  customerUidValue: string | null | undefined;
  minDate: Date;
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
        intl, customerUidValue, onChangeCustomer, minDate,
      } = props;

      const projectFilter: any = {
        customerUids: customerUidValue,
        statusTypes: [WorkflowStatusType.Approved, WorkflowStatusType.ReOpened].join(),

      };
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {
        case 'uid': 
          fieldProps = {
            disabled: true,
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;

        case 'date': 
          fieldProps = {
            minDate,
            type: 'text',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: InputDate
          };
          break;
        
        case 'expenseType':
          fieldProps = {
            category: 'expense',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: SelectSystem
          };
          break;
        
        case 'customerUid': 
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: InputCustomer,
            onChange: onChangeCustomer
          };
          break;
          
        case 'projectUid':
          fieldProps = {
            type: 'text',
            disabled: (customerUidValue === null || customerUidValue === undefined),
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: SelectProject,
            filter: projectFilter
          };
          break;
          
        case 'value':
          fieldProps = {
            type: 'number',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: InputNumber
          };
          break;        
      
        case 'notes':
          fieldProps = {
            multiline: true,
            type: 'text',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
            component: InputText
          };
          break;  
      
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldName')),
            placeholder: intl.formatMessage(expenseMessage.request.fieldFor(name, 'fieldPlaceholder')),
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