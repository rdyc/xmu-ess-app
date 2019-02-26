import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeRateDetailFormView } from './AccountEmployeeRateDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeRateDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<AccountEmployeeRateDetailFormProps, OwnHandlers> = {
    generateFieldProps: (props: AccountEmployeeRateDetailFormProps) => (name: string) => { 
      const { 
        intl, formMode
      } = props;
      
      const fieldName = name.replace('information.', '');
      
      let fieldProps: SelectSystemOption & any = {};
  
      switch (fieldName) {   
        case 'uid':
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldPlaceholder')),
            disabled: true,
            component: InputText
          };
          break;
        
        case 'value':
          fieldProps = {
            required: true,
            label: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldPlaceholder')),
            component: InputNumber
          };
          break;
        
        default:
          fieldProps = {
            type: 'text',
            label: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldName')),
            placeholder: intl.formatMessage(accountMessage.rate.fieldFor(fieldName, 'fieldPlaceholder')),
            disabled: formMode === FormMode.Delete,
            component: InputText
          };
          break;
      }
      return fieldProps;
  }
};

export const AccountEmployeeRateDetailForm = compose<AccountEmployeeRateDetailFormProps, OwnProps>(
  setDisplayName('AccountEmployeeRateDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeRateDetailFormProps, OwnHandlers>(handlerCreators),
)(AccountEmployeeRateDetailFormView);