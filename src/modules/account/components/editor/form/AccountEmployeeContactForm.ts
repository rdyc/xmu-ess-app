import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeContactFormView } from './AccountEmployeeContactFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeContactFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeContactFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeContactFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'phone':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

      case 'mobilePhone':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

      case 'email':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'emailPersonal':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'address':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'addressAdditional':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'emergencyContactName':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'emergencyContactRelation':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'emergencyContactPhone':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

      case 'emergencyContactPhoneAdditional':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeContactForm = compose<AccountEmployeeContactFormProps, OwnProps>(
  injectIntl,
  withHandlers<AccountEmployeeContactFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeContactFormView);