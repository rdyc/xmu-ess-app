import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InputTextArea } from '@layout/components/input/textArea';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { LookupCustomerDetailFormView } from './LookupCustomerDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type LookupCustomerDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps
  & WithUser;

const handlerCreators: HandleCreators<LookupCustomerDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: LookupCustomerDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'companyUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany
        };
        break;

      case 'address':
        fieldProps = {
          required: true,
          multiline: true,
          label: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldPlaceholder')),
          component: InputTextArea
        };
        break;

      case 'addressAdditional':
        fieldProps = {
          required: true,
          multiline: true,
          label: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldPlaceholder')),
          component: InputTextArea
        };
        break;

      case 'isActive':
        fieldProps = {
          label: props.intl.formatMessage(lookupMessage.currency.field.ActiveStatus),
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupCustomerDetailForm = compose<LookupCustomerDetailFormProps, OwnProps>(
  injectIntl,
  withUser,
  withHandlers<LookupCustomerDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupCustomerDetailFormView);