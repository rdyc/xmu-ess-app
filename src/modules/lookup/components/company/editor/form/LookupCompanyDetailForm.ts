import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { LookupCompanyDetailFormView } from './LookupCompanyDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type CompanyDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps
  & WithUser;

const handlerCreators: HandleCreators<CompanyDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: CompanyDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'code':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'name':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.company.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupCompanyDetailForm = compose<CompanyDetailFormProps, OwnProps>(
  injectIntl,
  withUser,
  withHandlers<CompanyDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupCompanyDetailFormView);