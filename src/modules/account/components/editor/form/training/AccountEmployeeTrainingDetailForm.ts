import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeTrainingDetailFormView } from './AccountEmployeeTrainingDetailFormView';

interface OwnProps {
  formMode: FormMode | undefined;
  disabledControls: boolean;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeTrainingDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeTrainingDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeTrainingDetailFormProps) => (name: string) => {
    const { intl, disabledControls } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'name':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'start':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate
        };
        break;

      case 'end':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate
        };
        break;

      case 'organizer':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'trainingType':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          category: 'training',
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'certificationType':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          category: 'certification',
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.training.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeTrainingDetailForm = compose<AccountEmployeeTrainingDetailFormProps, OwnProps>(
  setDisplayName('TrainingDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeTrainingDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeTrainingDetailFormView);