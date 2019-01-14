import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeBankFormView } from './AccountEmployeeBankFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeBankFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeBankFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeBankFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'citizenNumber':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'taxNumber':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'familyCardNumber':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'bpjsEmployementNumber':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'bpjsHealthCareNumber':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'bankAccount':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'bankAccountName':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'bankAccountBranch':
        fieldProps = {
          label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
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

export const AccountEmployeeBankForm = compose<AccountEmployeeBankFormProps, OwnProps>(
  injectIntl,
  withHandlers<AccountEmployeeBankFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeBankFormView);