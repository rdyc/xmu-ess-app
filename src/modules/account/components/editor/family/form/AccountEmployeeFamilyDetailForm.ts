import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeFamilyDetailFormView } from './AccountEmployeeFamilyDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeFamilyDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeFamilyDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeFamilyDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      
      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'familyType':
        fieldProps = {
          required: true,
          category: 'family',
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'fullName':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'genderType':
        fieldProps = {
          required: true,
          category: 'gender',
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'birthPlace':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'birthDate':
        fieldProps = {
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  },
};

export const AccountEmployeeFamilyDetailForm = compose<AccountEmployeeFamilyDetailFormProps, OwnProps>(
  setDisplayName('AccountEmployeeEducationDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeFamilyDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeFamilyDetailFormView);