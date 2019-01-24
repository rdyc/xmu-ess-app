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
  formMode: FormMode | undefined;
  disabledControls: boolean;
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
    const { intl, disabledControls } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'familyType':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          category: 'family',
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'fullName':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'genderType':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          category: 'gender',
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'birthPlace':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.family.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'birthDate':
        fieldProps = {
          disabled: disabledControls,
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
  setDisplayName('EducationDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeFamilyDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeFamilyDetailFormView);