import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeNoteDetailFormView } from './AccountEmployeeNoteDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeNoteDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeNoteDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeNoteDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      
      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'id':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'text':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeNoteDetailForm = compose<AccountEmployeeNoteDetailFormProps, OwnProps>(
  setDisplayName('NoteDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeNoteDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeNoteDetailFormView);