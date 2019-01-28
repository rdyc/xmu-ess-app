import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { AccountEmployeeDetailFormView } from './AccountEmployeeDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  companyUidValue: string | undefined;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeDetailFormProps) => (name: string) => {
    const { intl, companyUidValue } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'employmentNumber':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
      
      case 'fullName':
        fieldProps = {
          required: true,          
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

        case 'genderType':
        fieldProps = {
          required: true,
          category: 'gender',
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

        case 'birthPlace':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText  
        };
        break;

        case 'dateOfBirth':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate  
        };
        break;

        case 'companyUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany  
        };
        break;

        case 'employmentType':
        fieldProps = {
          required: true,
          category: 'employment',
          disabled: isNullOrUndefined(companyUidValue),
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          companyUid: companyUidValue,
          component: SelectSystem
        };
        break;

        case 'joinDate':
        fieldProps = {
          required: true,
          disableFuture: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate  
        };
        break;

        case 'taxType':
        fieldProps = {
          required: true,
          category: 'tax',
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

        case 'inactiveDate':
        fieldProps = {
          disablePast: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate  
        };
        break;

        case 'bloodType':
        fieldProps = {
          required: true,
          category: 'blood',
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

        case 'religionType':
        fieldProps = {
          required: true,
          category: 'religion',
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      default:
      fieldProps = {
        type: 'text',
        label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
        placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
        component: InputText
      };
      break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeDetailForm = compose<AccountEmployeeDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<AccountEmployeeDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeDetailFormView);