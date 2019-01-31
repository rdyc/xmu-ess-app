import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputImage } from '@layout/components/input/image';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeImageFormView } from './AccountEmployeeImageFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeImageFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeImageFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeImageFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'image':
      fieldProps = {
        required: true,
        disabled: false,
        label: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldName')),
        placeholder: intl.formatMessage(accountMessage.employee.fieldFor(name, 'fieldPlaceholder')),   
        component: InputImage
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

export const AccountEmployeeImageForm = compose<AccountEmployeeImageFormProps, OwnProps>(
  injectIntl,
  withHandlers<AccountEmployeeImageFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeImageFormView);