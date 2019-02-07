import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeNoteDetailView } from './AccountEmployeeNoteDetailView';

interface OwnProps {
  formMode: FormMode | undefined;
  disabledControls: boolean;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeNoteDetailProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeNoteDetailProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeNoteDetailProps) => (name: string) => {
    const { intl, disabledControls } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'id':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.note.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'employeeUid':
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
          disabled: disabledControls,
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

export const AccountEmployeeNoteDetail = compose<AccountEmployeeNoteDetailProps, OwnProps>(
  setDisplayName('NoteDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeNoteDetailProps, OwnHandlers>(handleCreators)
)(AccountEmployeeNoteDetailView);